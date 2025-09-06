/*
  # Adicionar campos de informações do site à tabela settings

  1. Novos Campos
    - `site_title` (text) - Título do site
    - `site_description` (text) - Descrição do site  
    - `contact_email` (text) - Email de contato
    - `instagram_url` (text) - URL do Instagram
    - `seo_keywords` (text) - Palavras-chave SEO
    - `hero_images` (jsonb) - Array de URLs das imagens do hero

  2. Valores Padrão
    - Configurações iniciais para o site
*/

DO $$
BEGIN
  -- Adicionar novos campos se não existirem
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'settings' AND column_name = 'site_title'
  ) THEN
    ALTER TABLE settings ADD COLUMN site_title text DEFAULT 'Valdigley Fotografia';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'settings' AND column_name = 'site_description'
  ) THEN
    ALTER TABLE settings ADD COLUMN site_description text DEFAULT 'Fotógrafo especializado em casamentos e pré-weddings em Jericoacoara, Sobral e Fortaleza';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'settings' AND column_name = 'contact_email'
  ) THEN
    ALTER TABLE settings ADD COLUMN contact_email text DEFAULT 'contato@valdigley.com';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'settings' AND column_name = 'instagram_url'
  ) THEN
    ALTER TABLE settings ADD COLUMN instagram_url text DEFAULT 'https://instagram.com/valdigleyfoto';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'settings' AND column_name = 'seo_keywords'
  ) THEN
    ALTER TABLE settings ADD COLUMN seo_keywords text DEFAULT 'fotografia casamento, Jericoacoara, Sobral, Fortaleza, pré wedding, ensaio casal';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'settings' AND column_name = 'hero_images'
  ) THEN
    ALTER TABLE settings ADD COLUMN hero_images jsonb DEFAULT '["https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg", "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg", "https://images.pexels.com/photos/265885/pexels-photo-265885.jpeg"]'::jsonb;
  END IF;
END $$;

-- Inserir configurações padrão se não existir nenhum registro
INSERT INTO settings (
  site_title,
  site_description,
  contact_email,
  instagram_url,
  seo_keywords,
  hero_images
) 
SELECT 
  'Valdigley Fotografia',
  'Fotógrafo especializado em casamentos e pré-weddings em Jericoacoara, Sobral e Fortaleza',
  'contato@valdigley.com',
  'https://instagram.com/valdigleyfoto',
  'fotografia casamento, Jericoacoara, Sobral, Fortaleza, pré wedding, ensaio casal',
  '["https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg", "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg", "https://images.pexels.com/photos/265885/pexels-photo-265885.jpeg"]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM settings LIMIT 1);