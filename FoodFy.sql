--CREATE TABLES

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" int DEFAULT 0,
  "title" text NOT NULL,
  "ingredients" text[],
  "preparation" text[],
  "information" text,
  "created_at" timestamp DEFAULT(now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "file_id" integer,
  "created_at" timestamp DEFAULT(now()),
  "updated_at" timestamp DEFAULT (now())
);
    
CREATE TABLE "files" (
    "id" SERIAL PRIMARY KEY,
    "name" text,
    "path" text NOT NULL
);

CREATE TABLE "recipes_files"(
    "id" SERIAL PRIMARY KEY,
    "recipe_id" integer,
    "file_id" integer
);

--CREATE PROCEDURE

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--CREATE FUNCTION AUTO updated_at for recipes

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

--CREATE FUNCTION AUTO updated_at for chefs

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- TABLE RELATIONS

ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");    
ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");
ALTER TABLE "recipes_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");
ALTER TABLE "recipes_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");