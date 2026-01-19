-- Query 1: Insert Tony Stark account
INSERT INTO account (
    account_firstname,
    account_lastname,
    account_email,
    account_password
  )
VALUES (
    'Tony',
    'Stark',
    'tony@starkent.com',
    'Iam1ronM@n'
  );

-- Query 2: Update Tony Stark account to Admin type
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

-- Query 3: Delete Tony Stark record
DELETE FROM account
WHERE account_email = 'tony@starkent.com';

-- Query 4: Modify GM Hummer record to replace "small interiors" with "a huge interior"
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Query 5: Select make, model, and classification name for Sport category using INNER JOIN
SELECT inv_make, inv_model, classification_name
FROM inventory
INNER JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification_name = 'Sport';

-- Query 6: Update all records to add "/vehicles" to the middle of file paths
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
