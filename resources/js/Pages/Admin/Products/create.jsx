import { useState } from "react";
import { router } from "@inertiajs/react";
import ProductVariantsForm from "@/Components/ProductVariantsForm";

export default function Create({ categories = [], stores = [] }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    store_id: "",
    stock: "",
    sku: "",
    tags: [],
    images: [],
    variants: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name     = "Le nom est obligatoire";
    if (!form.price)        e.price    = "Le prix est obligatoire";
    if (!form.category_id)  e.category_id = "La catégorie est obligatoire";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Inertia POST → ProductController@store
    router.post("/admin/products", form, {
      onError:  (err) => { setErrors(err); setLoading(false); },
      onFinish: ()    => setLoading(false),
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Créer un produit</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ── Infos de base ── */}
        <section className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="font-semibold text-gray-700">Informations générales</h2>

          <div>
            <label className="label">Nom *</label>
            <input
              className={`input ${errors.name ? "border-red-500" : ""}`}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Nom du produit"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="label">Description</label>
            <textarea
              className="input"
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Description du produit..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Prix (MAD) *</label>
              <input
                type="number"
                className={`input ${errors.price ? "border-red-500" : ""}`}
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="label">Stock</label>
              <input
                type="number"
                className="input"
                value={form.stock}
                onChange={(e) => update("stock", e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Catégorie *</label>
              <select
                className={`input ${errors.category_id ? "border-red-500" : ""}`}
                value={form.category_id}
                onChange={(e) => update("category_id", e.target.value)}
              >
                <option value="">Sélectionner...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
            </div>

            <div>
              <label className="label">Store</label>
              <select
                className="input"
                value={form.store_id}
                onChange={(e) => update("store_id", e.target.value)}
              >
                <option value="">Sélectionner...</option>
                {stores.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label">SKU / Référence</label>
            <input
              className="input"
              value={form.sku}
              onChange={(e) => update("sku", e.target.value)}
              placeholder="PROD-001"
            />
          </div>
        </section>

        {/* ── Variantes — Composant séparé ── */}
        <ProductVariantsForm
          variants={form.variants}
          onChange={(variants) => update("variants", variants)}
        />

        {/* ── Actions ── */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
            onClick={() => router.visit("/admin/products")}
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Enregistrement..." : "Créer le produit"}
          </button>
        </div>

      </form>
    </div>
  );
}