\c ishc

INSERT INTO teams(name, lab_name) VALUES
  ('TEAM HOGEHOGE', '小倉研究室'),
  ('TEAM FUGAFUGA', '大谷研究室'),
  ('TEAM PIYOPIYO', '宮地研究室');

INSERT INTO judges(team_id, question_id, answer, correct_flg, score, language, memory, answer_time, msg, created_at, updated_at) VALUES
  ('2', '1', 'console.log(''hoge'')', 1, 300, 'JavaScript', '3200KB', 1000, '', current_timestamp, current_timestamp),
  ('3', '1', 'console.log(''hoge'')', 1, 300, 'JavaScript', '3200KB', 1000, '', current_timestamp, current_timestamp),
  ('2', '2', 'console.log(''hoge'')', 1, 500, 'JavaScript', '3200KB', 1000, '', current_timestamp, current_timestamp),
  ('1', '1', 'console.log(''hoge'')', 0, 300, 'JavaScript', '3200KB', 1000, '', current_timestamp, current_timestamp),
  ('2', '3', 'console.log(''hoge'')', 1, 300, 'JavaScript', '3200KB', 1000, '', current_timestamp, current_timestamp),
  ('2', '1', 'console.log(''hoge'')', 1, 700, 'JavaScript', '3200KB', 1000, '', current_timestamp, current_timestamp),
  ('3', '1', 'console.log(''hoge'')', 1, 300, 'JavaScript', '3200KB', 1000, '', current_timestamp, current_timestamp),
  ('2', '1', 'console.log(''hoge'')', 1, 300, 'JavaScript', '3200KB', 1000, '', current_timestamp, current_timestamp),
  ('2', '5', 'console.log(''hoge'')', 0, 200, 'JavaScript', '3200KB', 1000, '', current_timestamp, current_timestamp),
  ('2', '2', 'console.log(''hoge'')', 1, 300, 'JavaScript', '3200KB', 1000, '', current_timestamp, current_timestamp),
  ('1', '1', 'console.log(''hoge'')', 1, 300, 'JavaScript', '3200KB', 1000, '', current_timestamp, current_timestamp),
  ('2', '4', 'console.log(''hoge'')', 0, 500, 'JavaScript', '3200KB', 1000, '', current_timestamp, current_timestamp),
  ('1', '1', 'console.log(''hoge'')', 1, 300, 'JavaScript', '3200KB', 1000, '', current_timestamp, current_timestamp),
  ('2', '1', 'console.log("hoge")', 1, 300, 'JavaScript', '3200KB', 1000, '', current_timestamp, current_timestamp),
  ('2', '1', 'console.log(''hoge'')', 1, 300, 'JavaScript', '3200KB', 1000, '', current_timestamp, current_timestamp);