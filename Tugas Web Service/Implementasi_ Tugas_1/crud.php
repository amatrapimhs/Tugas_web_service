<?php
// crud.php

include 'config.php';

// Fungsi Create: Menambahkan data baru
function createData($company, $last_name, $first_name, $email_address, $job_title, $business_phone, $home_phone, $mobile_phone, $fax_number, $address, $city, $state_province, $zip_postal_code, $country_region, $web_page, $notes, $attachments) {
    global $conn;
    $sql = "INSERT INTO customers (company, last_name, first_name, email_address, job_title, business_phone, home_phone, mobile_phone, fax_number, address, city, state_province, zip_postal_code, country_region, web_page, notes, attachments) VALUES ('$company', '$last_name', '$first_name', '$email_address', '$job_title', '$business_phone', '$home_phone', '$mobile_phone', '$fax_number', '$address', '$city', '$state_province', '$zip_postal_code', '$country_region', '$web_page', '$notes', '$attachments')";
    
    if ($conn->query($sql) === TRUE) {
        echo "Data created successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Fungsi Read: Mendapatkan semua data
function getAllData() {
    global $conn;
    $sql = "SELECT * FROM customers";
    $result = $conn->query($sql);
    return $result;
}

// Fungsi Update: Memperbarui data berdasarkan ID
function updateData($id, $company, $last_name, $first_name, $email_address, $job_title, $business_phone, $home_phone, $mobile_phone, $fax_number, $address, $city, $state_province, $zip_postal_code, $country_region, $web_page, $notes, $attachments) {
    global $conn;
    $sql = "UPDATE customers SET company='$company', last_name='$last_name', first_name='$first_name', email_address='$email_address', job_title='$job_title', business_phone='$business_phone', home_phone='$home_phone', mobile_phone='$mobile_phone', fax_number='$fax_number', address='$address', city='$city', state_province='$state_province', zip_postal_code='$zip_postal_code', country_region='$country_region', web_page='$web_page', notes='$notes', attachments='$attachments' WHERE id=$id";
    
    if ($conn->query($sql) === TRUE) {
        echo "Data updated successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Fungsi Delete: Menghapus data berdasarkan ID
function deleteData($id) {
    global $conn;
    $sql = "DELETE FROM customers WHERE id=$id";
    
    if ($conn->query($sql) === TRUE) {
        echo "Data deleted successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
?>
