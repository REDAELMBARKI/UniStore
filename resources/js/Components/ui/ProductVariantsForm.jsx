import { useState } from "react";

const VARIANT_TYPES = ["Taille", "Couleur", "Matière", "Modèle", "Pack"];

// ── Ligne unique d'une variante ──────────────────────────────
function VariantRow({ variant, onChange, onRemove }) {
  return (
    <div className="grid grid-cols-5 gap-3 items-end p-3 bg-gray-50 rounded-lg border border-gray-200">
      {/* Type */}
      <div>
        <label className="text-xs text-gray-500 uppercase font-medium block mb-1">Type</label>
        <select
          className="input"
          value={variant.name}
          onChange={(e) => onChange("name", e.target.value)}
        >
          <option value="">Choisir</option>
          {VARIANT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Valeur */}
      <div>
        <label className="text-xs text-gray-500 uppercase font-medium block mb-1">Valeur</label>
        <input
          className="input"
          value={variant.value}
          onChange={(e) => onChange("value", e.target.value)}
          placeholder="Ex: Rouge, XL"
        />
      </div>

      {/* Prix */}
      <div>
        <label className="text-xs text-gray-500 uppercase font-medium block mb-1">Prix (MAD)</label>
        <input
          type="number"
          className="input"
          value={variant.price}
          onChange={(e) => onChange("price", e.target.value)}
          placeholder="0.00"
          min="0"
          step="0.01"
        />
      </div>

      {/* Stock */}
      <div>
        <label className="text-xs text-gray-500 uppercase font-medium block mb-1">Stock</label>
        <input
          type="number"
          className="input"
          value={variant.stock}
          onChange={(e) => onChange("stock", e.target.value)}
          placeholder="0"
          min="0"
        />
      </div>

      {/* Supprimer */}
      <button
        type="button"
        onClick={onRemove}
        className="h-10 px-3 rounded-lg bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 transition"
        title="Supprimer cette variante"
      >
        ✕
      </button>
    </div>
  );
}

// ── Composant principal variantes ───────────────────────────
export default function ProductVariantsForm({ variants = [], onChange }) {

  const addVariant = () => {
    onChange([
      ...variants,
      { id: Date.now(), name: "", value: "", price: "", stock: "" },
    ]);
  };

  const updateVariant = (id, field, value) => {
    onChange(
      variants.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const removeVariant = (id) => {
    onChange(variants.filter((v) => v.id !== id));
  };

  return (
    <section className="bg-white rounded-xl shadow p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-700">
          Variantes
          <span className="ml-2 text-sm bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
            {variants.length}
          </span>
        </h2>
      </div>

      {variants.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-6">
          Aucune variante — cliquez sur + pour en ajouter
        </p>
      )}

      <div className="space-y-3">
        {variants.map((variant) => (
          <VariantRow
            key={variant.id}
            variant={variant}
            onChange={(field, value) => updateVariant(variant.id, field, value)}
            onRemove={() => removeVariant(variant.id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addVariant}
        className="w-full py-2.5 border-2 border-dashed border-orange-300 text-orange-500 rounded-lg hover:bg-orange-50 transition font-medium text-sm"
      >
        ＋ Ajouter une variante
      </button>
    </section>
  );
}