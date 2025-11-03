-- Insert Dogs (only if they don't exist)
INSERT IGNORE INTO dogs (id, name, age, sex, breed, size, weight, status, arrived_date, description) VALUES
(1, 'Max', 3, 'M', 'Golden Retriever', 'LARGE', 30, 'AVAILABLE', '2024-01-15', 'Friendly and energetic'),
(2, 'Bella', 2, 'F', 'Labrador', 'LARGE', 28, 'AVAILABLE', '2024-02-20', 'Loves to play fetch'),
(3, 'Charlie', 1, 'M', 'Beagle', 'MEDIUM', 12, 'AVAILABLE', '2024-03-10', 'Very curious and playful'),
(4, 'Luna', 4, 'F', 'Husky', 'LARGE', 25, 'AVAILABLE', '2024-01-05', 'Energetic and loves the outdoors'),
(5, 'Rocky', 5, 'M', 'Bulldog', 'MEDIUM', 22, 'AVAILABLE', '2023-12-20', 'Calm and gentle'),
(6, 'Daisy', 2, 'F', 'Poodle', 'SMALL', 8, 'AVAILABLE', '2024-03-01', 'Smart and affectionate'),
(7, 'Cooper', 3, 'M', 'German Shepherd', 'LARGE', 35, 'AVAILABLE', '2024-02-10', 'Loyal and protective'),
(8, 'Lily', 1, 'F', 'Shih Tzu', 'SMALL', 6, 'AVAILABLE', '2024-03-15', 'Sweet and cuddly'),
(9, 'Buddy', 6, 'M', 'Mixed Breed', 'MEDIUM', 18, 'AVAILABLE', '2023-11-30', 'Friendly with everyone'),
(10, 'Molly', 4, 'F', 'Cocker Spaniel', 'MEDIUM', 15, 'AVAILABLE', '2024-01-25', 'Loves belly rubs'),
(11, 'Duke', 7, 'M', 'Rottweiler', 'LARGE', 45, 'ADOPTED', '2023-10-15', 'Well-trained and obedient'),
(12, 'Sadie', 2, 'F', 'Corgi', 'SMALL', 11, 'AVAILABLE', '2024-02-28', 'Playful and cheerful');

-- Insert Dog Images (only if they don't exist)
INSERT IGNORE INTO dog_pictures (dog_id, file_path) VALUES
(1, 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'),
(2, 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400'),
(3, 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'),
(4, 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=400'),
(5, 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400'),
(6, 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400'),
(7, 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400'),
(8, 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400'),
(9, 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400'),
(10, 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400'),
(11, 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400'),
(12, 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=400');

-- Insert Accounts (only if they don't exist)
INSERT IGNORE INTO accounts (id, name, email, role, password) VALUES
(1, 'Admin User', 'admin@gmail.com', 'ADMIN', 'admin123'),
(2, 'Emman Guy', 'emmanguy@gmail.com', 'USER', 'emmanguy');

-- Insert Applications (only if they don't exist)
INSERT IGNORE INTO applications (id, dog_id, user_id, status, application_date) VALUES
(1, 11, 2, 'COMPLETE', '2024-03-15'),
(2, 1, 3, 'ONGOING', '2024-03-20'),
(3, 4, 4, 'ONGOING', '2024-03-22'),
(4, 7, 5, 'CANCELLED', '2024-03-10');
