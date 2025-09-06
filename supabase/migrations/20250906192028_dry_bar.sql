/*
  # Adicionar suporte para Google Reviews

  1. Modificações na tabela testimonials
    - Adicionar campo google_review_id para evitar duplicatas
    - Adicionar campo google_data para armazenar dados extras do Google
    
  2. Modificações na tabela settings
    - Adicionar campos para configuração do Google Places API
    
  3. Índices
    - Índice único para google_review_id
*/

-- Adicionar campos para Google Reviews na tabela testimonials
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'google_review_id'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN google_review_id text UNIQUE;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'google_data'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN google_data jsonb DEFAULT '{}';
  END IF;
END $$;

-- Adicionar campos para configuração do Google na tabela settings
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'settings' AND column_name = 'google_places_api_key'
  ) THEN
    ALTER TABLE settings ADD COLUMN google_places_api_key text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'settings' AND column_name = 'google_place_id'
  ) THEN
    ALTER TABLE settings ADD COLUMN google_place_id text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'settings' AND column_name = 'google_reviews_enabled'
  ) THEN
    ALTER TABLE settings ADD COLUMN google_reviews_enabled boolean DEFAULT false;
  END IF;
END $$;

-- Criar índice para google_review_id se não existir
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'testimonials' AND indexname = 'idx_testimonials_google_review_id'
  ) THEN
    CREATE INDEX idx_testimonials_google_review_id ON testimonials(google_review_id);
  END IF;
END $$;