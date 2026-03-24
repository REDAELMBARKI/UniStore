<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Carbon\Carbon;

class EmailVerificationController extends Controller
{
    /**
     * Send a new email verification notification.
     * SCRUM-56 / SCRUM-59: Generate verification token and send email
     */
    public function sendVerificationEmail(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified.',
                'verified' => true,
            ], 200);
        }

        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Verification link sent to your email.',
            'verified' => false,
        ], 200);
    }

    /**
     * Mark the authenticated user's email address as verified.
     * SCRUM-58: Add email_verified_at
     */
    public function verify(Request $request, int $id, string $hash): JsonResponse
    {
        $user = User::findOrFail($id);

        // Check if hash is valid
        if (! hash_equals(sha1($user->getEmailForVerification()), $hash)) {
            return response()->json([
                'message' => 'Invalid verification link.',
            ], 403);
        }

        // Check if URL signature is valid
        if (! $request->hasValidSignature()) {
            return response()->json([
                'message' => 'Verification link has expired or is invalid.',
                'expired' => true,
            ], 403);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified.',
                'verified' => true,
            ], 200);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return response()->json([
            'message' => 'Email verified successfully.',
            'verified' => true,
        ], 200);
    }

    /**
     * Get verification status for authenticated user.
     */
    public function status(Request $request): JsonResponse
    {
        return response()->json([
            'verified' => $request->user()->hasVerifiedEmail(),
            'email' => $request->user()->email,
        ]);
    }
}