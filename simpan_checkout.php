<?php
$servername = "localhost"; // Ganti dengan nama server database Anda
$username = "root";        // Ganti dengan username database Anda
$password = "";            // Ganti dengan password database Anda
$dbname = "simpan"; // Ganti dengan nama database Anda

// Membuat koneksi ke database
$conn = new mysqli($servername, $username, $password, $dbname);

// Mengecek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Mendapatkan data dari permintaan POST
$data = json_decode(file_get_contents('php://input'), true);
$total = $data['total'];
$items = $data['items'];

// Menyimpan data ke tabel checkout
$sql = "INSERT INTO checkout (total) VALUES ('$total')";
if ($conn->query($sql) === TRUE) {
    $checkout_id = $conn->insert_id;
    
    // Menyimpan setiap item ke tabel checkout_items
    foreach ($items as $item) {
        $item_id = $item['id'];
        $item_nama = $item['nama'];
        $item_harga = $item['harga'];
        $item_qty = $item['qty'];
        
        $sql = "INSERT INTO checkout_items (checkout_id, item_id, item_nama, item_harga, item_qty) 
                VALUES ('$checkout_id', '$item_id', '$item_nama', '$item_harga', '$item_qty')";
        $conn->query($sql);
    }
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$conn->close();
?>
