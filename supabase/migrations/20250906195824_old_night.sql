/*
  # Criar tabela de informações do negócio

  1. Nova Tabela
    - `business_info`
      - `id` (uuid, primary key)
      - `name` (text) - Nome do negócio
      - `address` (text) - Endereço completo
      - `whatsapp` (text) - Número do WhatsApp
      - `email` (text) - Email de contato
      - `city` (text) - Cidade
      - `state` (text) - Estado
      - `instagram` (text) - URL do Instagram
      - `document` (text) - CPF/CNPJ
      - `zip_code` (text) - CEP
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Segurança
    - Habilitar RLS na tabela `business_info`
    - Política para admin gerenciar informações do negócio
    - Política para público ler informações do negócio
*/

CREATE TABLE IF NOT EXISTS business_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  whatsapp text,
  email text,
  city text,
  state text,
  instagram text,
  document text,
  zip_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE business_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage business info"
  ON business_info
  FOR ALL
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Public can read business info"
  ON business_info
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TRIGGER update_business_info_updated_at
  BEFORE UPDATE ON business_info
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Inserir dados iniciais do negócio
INSERT INTO business_info (
  name,
  address,
  whatsapp,
  email,
  city,
  state,
  instagram,
  document,
  zip_code
) VALUES (
  'Valdigley Fotografia',
  'Rua das Flores, 123 - Centro',
  '+55 85 99999-9999',
  'contato@valdigley.com',
  'Fortaleza',
  'CE',
  'https://instagram.com/valdigleyfoto',
  '123.456.789-00',
  '60000-000'
) ON CONFLICT DO NOTHING;