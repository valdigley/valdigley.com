/*
  # Criar tabela de submissões de contato

  1. Nova Tabela
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, nome completo)
      - `email` (text, email do cliente)
      - `phone` (text, telefone/whatsapp)
      - `event_type` (text, tipo de evento)
      - `event_date` (date, data do evento)
      - `location` (text, local do evento)
      - `message` (text, mensagem)
      - `status` (text, status da oportunidade)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Segurança
    - Enable RLS na tabela `contact_submissions`
    - Política para admin gerenciar submissões
    - Política para público criar submissões
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text NOT NULL,
  event_type text,
  event_date date,
  location text,
  message text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Política para admin gerenciar todas as submissões
CREATE POLICY "Admin can manage contact submissions"
  ON contact_submissions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política para público criar submissões
CREATE POLICY "Public can create contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions (status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_event_date ON contact_submissions (event_date);