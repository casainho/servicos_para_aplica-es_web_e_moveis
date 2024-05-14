import sqlite3

# Database file name (replace with your desired name)
DATABASE_NAME = "database_file.sqlite"

# Connect or create the database file
conn = sqlite3.connect(DATABASE_NAME)

# Create a cursor object to execute SQL statements
cursor = conn.cursor()

# Define tables structure
table_name_1 = "users"
columns_table_1 = """
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date_created NOW NOT NULL,
    NOW NOT NULL,
  user_id INTEGER NOT NULL UNIQUE,
  user_password TEXT NOT NULL,
  user_full_name TEXT NOT NULL
"""

table_name_2 = "robot_logs_minute"
columns_table_2 = """
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date NOW NOT NULL,
  energy_wh NUMERIC NOT NULL,
  distance_meters NOT NULL
"""

tables = [table_name_1, table_name_2]
table_columns = [columns_table_1, columns_table_2]
    
# Create the tables
for table, columns in zip(tables, table_columns):
  create_table_query = f"""
  CREATE TABLE IF NOT EXISTS {table} ({columns})
  """
  cursor.execute(create_table_query)
  conn.commit()

conn.close()

print(f"Database '{DATABASE_NAME}' created successfully!")
