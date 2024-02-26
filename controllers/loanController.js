import db from "../utils/db.js";

export const addToCart = async (req, res, next) => {
  // Ambil ID produk dari request
  const productId = parseInt(req.body.productId);

  // Temukan produk di database
  const product = await db.musicalInstrument.findUnique({
    where: {
      id,
    },
  });

  // Jika produk tidak ditemukan, kirim pesan error
  if (!product) {
    return res.status(404).send("Produk tidak ditemukan.");
  }

  // Dapatkan keranjang dari session
  const cart = req.session.cart || [];

  // Periksa apakah produk sudah ada di keranjang
  const existingProductIndex = cart.findIndex(
    (item) => item.productId === productId
  );

  // Jika produk sudah ada, tingkatkan kuantitas
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity++;
  } else {
    // Jika produk belum ada, tambahkan ke keranjang
    cart.push({
      productId,
      quantity: 1,
    });
  }

  // Simpan keranjang ke session
  req.session.cart = cart;

  // Kirim pesan sukses
  res.send("Produk berhasil ditambahkan ke keranjang!");
};

// Ekspor router
export default router;
