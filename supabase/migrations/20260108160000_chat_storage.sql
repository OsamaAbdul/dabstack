-- Create a new storage bucket for chat media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('chat-media', 'chat-media', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for chat-media bucket
CREATE POLICY "Anyone can view chat media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'chat-media');

CREATE POLICY "Authenticated users can upload chat media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'chat-media' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can delete own chat media"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'chat-media' AND 
    auth.uid() = owner
  );
