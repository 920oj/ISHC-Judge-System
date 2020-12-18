\c ishc

DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS judges;

CREATE TABLE teams(
  id SERIAL NOT NULL,
  name TEXT NOT NULL,
  lab_name TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE judges(
  id SERIAL NOT NULL,
  team_id INT NOT NULL,
  question_id INT NOT NULL,
  answer TEXT,
  correct_flg INT NOT NULL,
  score INT NOT NULL,
  language TEXT NOT NULL,
  memory DECIMAL,
  answer_time DECIMAL,
  msg TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (team_id)
    REFERENCES teams (id)
);