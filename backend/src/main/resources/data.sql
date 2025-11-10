-- Insert Dogs (only if they don't exist)
INSERT IGNORE INTO dogs (id, name, age, sex, breed, size, weight, status, arrived_date, description) VALUES
(1, 'Max', 3, 'M', 'Golden Retriever', 'LARGE', 30, 'AVAILABLE', '2024-01-15', 'Max is a friendly and energetic Golden Retriever who absolutely loves being around people. He has a beautiful golden coat that requires regular brushing, and he enjoys playing fetch in the yard. This smart boy already knows basic commands and would make a wonderful addition to any active family looking for a loyal companion.'),
(2, 'Bella', 2, 'F', 'Labrador', 'LARGE', 28, 'AVAILABLE', '2024-02-20', 'Bella is an enthusiastic Labrador who lives for playing fetch and swimming whenever she gets the chance. She has a shiny black coat and the most expressive brown eyes that will melt your heart. This sweet girl is house-trained, walks well on a leash, and gets along wonderfully with children and other dogs.'),
(3, 'Charlie', 1, 'M', 'Beagle', 'MEDIUM', 12, 'AVAILABLE', '2024-03-10', 'Charlie is a very curious and playful young Beagle with an excellent nose that leads him on many adventures. He has the classic Beagle coloring and adorable floppy ears. While he can be a bit mischievous when he catches an interesting scent, he''s incredibly affectionate and loves cuddling after a day of exploration.'),
(4, 'Luna', 4, 'F', 'Husky', 'LARGE', 25, 'AVAILABLE', '2024-01-05', 'Luna is a stunning Husky with piercing blue eyes and incredible energy that makes her perfect for an active household. She loves the outdoors and would be an ideal hiking or running partner. Luna is known for her conversational howls and would thrive in a home with a secure yard where she can burn off her abundant energy.'),
(5, 'Rocky', 5, 'M', 'Bulldog', 'MEDIUM', 22, 'AVAILABLE', '2023-12-20', 'Rocky is a calm and gentle Bulldog with a wonderful, easygoing personality that makes him great for first-time dog owners. He has adorable wrinkles and a charming underbite that gives him lots of character. This low-energy fellow enjoys leisurely walks and then spending the rest of the day relaxing with his favorite humans.'),
(6, 'Daisy', 2, 'F', 'Poodle', 'SMALL', 8, 'AVAILABLE', '2024-03-01', 'Daisy is an incredibly smart and affectionate Poodle with a hypoallergenic curly coat that requires regular grooming. She learns new tricks with remarkable speed and enjoys mental stimulation through puzzle toys. Despite her small size, she has a big personality and forms strong bonds with her family members.'),
(7, 'Cooper', 3, 'M', 'German Shepherd', 'LARGE', 35, 'AVAILABLE', '2024-02-10', 'Cooper is a loyal and protective German Shepherd who takes his role as family guardian very seriously. He has a magnificent coat and an intelligent, alert expression that reflects his sharp mind. With proper training and socialization, he has the potential to be an outstanding companion dog for an experienced owner.'),
(8, 'Lily', 1, 'F', 'Shih Tzu', 'SMALL', 6, 'AVAILABLE', '2024-03-15', 'Lily is an absolutely sweet and cuddly Shih Tzu who lives for lap time and gentle petting sessions. She has a beautiful long coat that can be styled in various ways depending on her owner''s preference. This petite girl has a gentle nature that makes her perfect for apartment living or as a companion for seniors.'),
(9, 'Buddy', 6, 'M', 'Mixed Breed', 'MEDIUM', 18, 'AVAILABLE', '2023-11-30', 'Buddy is a friendly mixed breed who gets along with everyone he meets, from children to other pets. He has a unique, handsome appearance with a warm, welcoming expression that immediately puts people at ease. This mature boy has a wonderful temperament and would fit into almost any loving home situation.'),
(10, 'Molly', 4, 'F', 'Cocker Spaniel', 'MEDIUM', 15, 'AVAILABLE', '2024-01-25', 'Molly is a beautiful Cocker Spaniel with soft, wavy hair and the most endearing eyes that will capture your heart. She absolutely loves belly rubs and will roll over at the slightest indication you might be willing to provide one. This sweet-natured girl enjoys gentle walks and curling up next to her favorite people in the evening.'),
(11, 'Duke', 7, 'M', 'Rottweiler', 'LARGE', 45, 'ADOPTED', '2023-10-15', 'Duke was a well-trained and obedient Rottweiler with a heart of gold beneath his strong exterior. He had impeccable manners and responded beautifully to commands, making him a pleasure to work with during his time at the shelter. We were delighted when this magnificent boy found his forever home with an experienced family who appreciated his wonderful qualities.'),
(12, 'Sadie', 2, 'F', 'Corgi', 'SMALL', 11, 'AVAILABLE', '2024-02-28', 'Sadie is an incredibly playful and cheerful Corgi with adorable short legs and a delightful personality to match. She has a bright, intelligent expression and loves learning new tricks, especially when tasty treats are involved. This happy girl with her wagging tail and sweet disposition would bring joy to any household lucky enough to adopt her.');

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
