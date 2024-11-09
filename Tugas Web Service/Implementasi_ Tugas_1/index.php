<?php
// index.php

include 'crud.php';

// Menambahkan data baru
if (isset($_POST['create'])) {
    createData($_POST['company'], $_POST['last_name'], $_POST['first_name'], $_POST['email_address'], $_POST['job_title'], $_POST['business_phone'], $_POST['home_phone'], $_POST['mobile_phone'], $_POST['fax_number'], $_POST['address'], $_POST['city'], $_POST['state_province'], $_POST['zip_postal_code'], $_POST['country_region'], $_POST['web_page'], $_POST['notes'], $_POST['attachments']);
}

// Memperbarui data berdasarkan ID
if (isset($_POST['update'])) {
    updateData($_POST['id'], $_POST['company'], $_POST['last_name'], $_POST['first_name'], $_POST['email_address'], $_POST['job_title'], $_POST['business_phone'], $_POST['home_phone'], $_POST['mobile_phone'], $_POST['fax_number'], $_POST['address'], $_POST['city'], $_POST['state_province'], $_POST['zip_postal_code'], $_POST['country_region'], $_POST['web_page'], $_POST['notes'], $_POST['attachments']);
}

// Menghapus data berdasarkan ID
if (isset($_GET['delete'])) {
    deleteData($_GET['delete']);
}

$data = getAllData();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CRUD Northwind - Customers</title>
</head>
<body>
    <h2>Create Customer</h2>
    <form method="post">
        <input type="text" name="company" placeholder="Company" required>
        <input type="text" name="last_name" placeholder="Last Name" required>
        <input type="text" name="first_name" placeholder="First Name" required>
        <input type="email" name="email_address" placeholder="Email" required>
        <input type="text" name="job_title" placeholder="Job Title">
        <input type="text" name="business_phone" placeholder="Business Phone">
        <input type="text" name="home_phone" placeholder="Home Phone">
        <input type="text" name="mobile_phone" placeholder="Mobile Phone">
        <input type="text" name="fax_number" placeholder="Fax Number">
        <input type="text" name="address" placeholder="Address">
        <input type="text" name="city" placeholder="City">
        <input type="text" name="state_province" placeholder="State/Province">
        <input type="text" name="zip_postal_code" placeholder="ZIP/Postal Code">
        <input type="text" name="country_region" placeholder="Country/Region">
        <input type="text" name="web_page" placeholder="Web Page">
        <input type="text" name="notes" placeholder="Notes">
        <input type="text" name="attachments" placeholder="Attachments">
        <button type="submit" name="create">Create</button>
    </form>

    <h2>Customers List</h2>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email Address</th>
            <th>Job Title</th>
            <th>Business Phone</th>
            <th>Actions</th>
        </tr>
        <?php while ($row = $data->fetch_assoc()) { ?>
            <tr>
                <td><?php echo $row['id']; ?></td>
                <td><?php echo $row['company']; ?></td>
                <td><?php echo $row['last_name']; ?></td>
                <td><?php echo $row['first_name']; ?></td>
                <td><?php echo $row['email_address']; ?></td>
                <td><?php echo $row['job_title']; ?></td>
                <td><?php echo $row['business_phone']; ?></td>
                <td>
                    <form method="post" style="display:inline-block;">
                        <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                        <button type="submit" name="update">Update</button>
                    </form>
                    <a href="?delete=<?php echo $row['id']; ?>" onclick="return confirm('Are you sure?')">Delete</a>
                </td>
            </tr>
        <?php } ?>
    </table>
</body>
</html>
