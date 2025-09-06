/*
  # Insert Sample Data for Portfolio

  1. Sample Categories
    - Casamento
    - Pré Wedding
    - Ensaio

  2. Sample Projects
    - Multiple projects with different categories
    - Some featured, some published

  3. Sample Project Images
    - Multiple images per project

  4. Sample Testimonials
    - Featured testimonials for homepage

  5. Sample Blog Posts
    - Published blog posts
*/

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
  ('Casamento', 'casamento', 'Fotografias de casamento completas'),
  ('Pré Wedding', 'pre-wedding', 'Ensaios pré-casamento românticos'),
  ('Ensaio', 'ensaio', 'Ensaios fotográficos diversos')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (
  title, slug, client_names, location, event_date, description, 
  cover_image, category_id, is_featured, is_published
) VALUES
  (
    'Ana & João',
    'ana-joao',
    'Ana & João',
    'Jericoacoara, CE',
    '2024-01-15',
    'Um casamento mágico nas dunas de Jericoacoara, com o pôr do sol mais lindo como cenário.',
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    (SELECT id FROM categories WHERE slug = 'casamento'),
    true,
    true
  ),
  (
    'Maria & Pedro',
    'maria-pedro',
    'Maria & Pedro',
    'Fortaleza, CE',
    '2024-02-20',
    'Um ensaio pré-wedding romântico nas praias de Fortaleza, capturando a essência do amor.',
    'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    (SELECT id FROM categories WHERE slug = 'pre-wedding'),
    true,
    true
  ),
  (
    'Clara & Lucas',
    'clara-lucas',
    'Clara & Lucas',
    'Sobral, CE',
    '2024-03-10',
    'Ensaio fotográfico em ambiente natural, destacando a conexão e cumplicidade do casal.',
    'https://images.pexels.com/photos/265885/pexels-photo-265885.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    (SELECT id FROM categories WHERE slug = 'ensaio'),
    true,
    true
  ),
  (
    'Beatriz & Rafael',
    'beatriz-rafael',
    'Beatriz & Rafael',
    'Jericoacoara, CE',
    '2024-04-05',
    'Cerimônia emocionante com vista para o mar, registrando cada momento especial.',
    'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    (SELECT id FROM categories WHERE slug = 'casamento'),
    true,
    true
  ),
  (
    'Fernanda & Diego',
    'fernanda-diego',
    'Fernanda & Diego',
    'Fortaleza, CE',
    '2024-05-12',
    'Sessão pré-wedding urbana, explorando a cidade e criando memórias únicas.',
    'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    (SELECT id FROM categories WHERE slug = 'pre-wedding'),
    true,
    true
  ),
  (
    'Isabella & Thiago',
    'isabella-thiago',
    'Isabella & Thiago',
    'Sobral, CE',
    '2024-06-18',
    'Ensaio intimista em locação especial, focando na naturalidade e espontaneidade.',
    'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    (SELECT id FROM categories WHERE slug = 'ensaio'),
    true,
    true
  )
ON CONFLICT (slug) DO NOTHING;

-- Insert sample project images
INSERT INTO project_images (project_id, image_url, alt_text, sort_order) VALUES
  -- Ana & João images
  (
    (SELECT id FROM projects WHERE slug = 'ana-joao'),
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Ana & João - Cerimônia',
    1
  ),
  (
    (SELECT id FROM projects WHERE slug = 'ana-joao'),
    'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Ana & João - Retrato dos noivos',
    2
  ),
  (
    (SELECT id FROM projects WHERE slug = 'ana-joao'),
    'https://images.pexels.com/photos/265885/pexels-photo-265885.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Ana & João - Momento íntimo',
    3
  ),
  (
    (SELECT id FROM projects WHERE slug = 'ana-joao'),
    'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Ana & João - Pôr do sol',
    4
  ),
  -- Maria & Pedro images
  (
    (SELECT id FROM projects WHERE slug = 'maria-pedro'),
    'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Maria & Pedro - Ensaio na praia',
    1
  ),
  (
    (SELECT id FROM projects WHERE slug = 'maria-pedro'),
    'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Maria & Pedro - Momento romântico',
    2
  ),
  (
    (SELECT id FROM projects WHERE slug = 'maria-pedro'),
    'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Maria & Pedro - Caminhada na praia',
    3
  );

-- Insert sample testimonials
INSERT INTO testimonials (client_name, content, rating, is_featured) VALUES
  (
    'Ana & João',
    'Valdigley conseguiu capturar cada momento do nosso casamento com uma sensibilidade única. As fotos ficaram simplesmente perfeitas e emocionantes!',
    5,
    true
  ),
  (
    'Maria & Pedro',
    'Profissional incrível! Nos deixou super à vontade durante todo o ensaio. O resultado superou todas as nossas expectativas.',
    5,
    true
  ),
  (
    'Clara & Lucas',
    'A qualidade das fotos é impressionante. Valdigley tem um olhar artístico excepcional e entrega um trabalho impecável.',
    5,
    true
  ),
  (
    'Beatriz & Rafael',
    'Recomendamos de olhos fechados! Profissionalismo, criatividade e um resultado final que nos emocionou muito.',
    5,
    false
  ),
  (
    'Fernanda & Diego',
    'Desde o primeiro contato até a entrega das fotos, tudo foi perfeito. Um trabalho de altíssima qualidade!',
    5,
    false
  );

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, is_published) VALUES
  (
    'Dicas para o Seu Ensaio Pré-Wedding',
    'dicas-ensaio-pre-wedding',
    'O ensaio pré-wedding é uma oportunidade única de criar memórias especiais antes do grande dia. Aqui estão algumas dicas importantes para aproveitar ao máximo essa experiência...',
    'Descubra como tornar seu ensaio pré-wedding inesquecível com nossas dicas profissionais.',
    'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',
    true
  ),
  (
    'Como Escolher o Local Perfeito para Seu Casamento',
    'local-perfeito-casamento',
    'A escolha do local é uma das decisões mais importantes no planejamento do casamento. Cada ambiente oferece possibilidades únicas para a fotografia...',
    'Saiba como escolher o local ideal que combine com seu estilo e proporcione fotos incríveis.',
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    true
  ),
  (
    'A Importância da Luz Natural na Fotografia',
    'luz-natural-fotografia',
    'A luz natural é um dos elementos mais importantes na fotografia. Entenda como aproveitamos diferentes momentos do dia para criar imagens únicas...',
    'Descubra como a luz natural pode transformar suas fotos em verdadeiras obras de arte.',
    'https://images.pexels.com/photos/265885/pexels-photo-265885.jpeg?auto=compress&cs=tinysrgb&w=800',
    true
  );