<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;


class UserSeeder extends Seeder{

    public function run()
    {
        // Ensure roles exist
        $adminRole = \App\Models\Role::firstOrCreate(['name' => 'admin']);
        \App\Models\Role::firstOrCreate(['name' => 'super admin']);
        \App\Models\Role::firstOrCreate(['name' => 'user']);

        // Create the specific admin user
        $admin = User::firstOrCreate(
            ['email' => 'amin@example.com'],
            [
                'name' => 'Admin User',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Assign admin role if not already assigned
        if (!$admin->roles()->where('name', 'admin')->exists()) {
            $admin->roles()->attach($adminRole);
        }

        User::factory()->count(10)->create();
    }

     
}