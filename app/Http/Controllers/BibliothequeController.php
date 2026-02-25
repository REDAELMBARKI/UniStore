<?php

namespace App\Http\Controllers;

use App\Models\Auteur;
use App\Models\Livre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BibliothequeController extends Controller
{
    public function indexLivres()
    {
        $livres = Livre::with('auteur');
        return Inertia::render('livres.index', compact('livres'));
    }

    public function createLivre()
    {
        $auteurs = Auteur::all();
        return Inertia::render('livres.create', compact('auteurs'));
    }

    public function storeLivre(Request $request)
    {
        $request->validate([
            'titre' => 'required',
            'annee_publication' => 'required|digits:4',
            'nombre_pages' => 'required|integer',
            'auteur_id' => 'required|exists:auteurs,id'
        ]);

        Livre::create($request->all());

        return redirect()->route('livres.index');
    }
}
