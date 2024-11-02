CREATE TABLE photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  thumbnail_path text,
  file_type text NOT NULL,
  taken_at timestamp without time zone,
  taken_lat float,
  taken_lon float,
  taken_iso integer,
  taken_exposure text,
  taken_focal_length text,
  taken_f_number text,
  resolution_width integer,
  resolution_height integer,
  created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER photos_updated_at
  BEFORE UPDATE
  ON photos
  FOR EACH ROW
    EXECUTE FUNCTION moddatetime(updated_at);
