require 'sinatra'
require 'json'
require 'sinatra/cross_origin'
require 'pg'

set :port, 4567
set :bind, '0.0.0.0'

$BOOKDATA

#CORS Connection
configure do
  enable :cross_origin
end

before do
  content_type :json
  response.headers['Access-Control-Allow-Origin'] = '*'
end
# CORS preflight
options "*" do
  response.headers["Allow"] = "GET, POST, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Content-Type"
  200
end

DB =  PG.connect(
  dbname: "book_list",
  user: "vishal",
  password: "root",
  # host: 'db',
  host: 'db',
  port: 5432
)


post '/signup' do
  data = JSON.parse(request.body.read)
  user = DB.exec_params("SELECT * FROM public.users WHERE email = $1", [data["email"]]).first
  if user
    halt 400, {error: "User already exists"}.to_json
  else
    DB.exec_params("INSERT INTO USERS(email, password) values ($1, $2)", [data["email"], data["password"]])
    {message: "Signup Successful"}.to_json
  end
end



post '/login' do
  data = JSON.parse(request.body.read)
  user = DB.exec_params("SELECT * FROM users WHERE email = $1 AND password = $2", [data["email"], data["password"]]).first
 
  if user
    puts user
    payload={email:user["email"],exp: Time.now.to_i + 3600}
    {  
       message: "Login successful", email: user["email"] }.to_json
  else
    halt 401, { error: "First Time user : Sign in" }.to_json
  end
 
end

get '/books' do
  result = DB.exec_params("SELECT * FROM books")
  puts result
  books = result.map { |row| { book: row['bookname'], author: row['author'] } }
  if books
    File.write('./books.json', JSON.pretty_generate(books))
    book_list = File.read("./books.json")
    book_list.to_json
  else
    {message: "No Book Information Available"}.to_json
  end
end

post '/adminlogin' do
  data = JSON.parse(request.body.read);
  checkemail = data["adminemail"]
  puts checkemail
  val = DB.exec_params("SELECT * from admin where email=$1", [checkemail])
  admin = val.first
  if admin
    # Return JSON response (convert Hash to JSON)
    { message: "Admin found", admin: checkemail }.to_json
  else
    status 404
    { error: "Admin not found" }.to_json
  end
end

post '/admin/add' do
  data = JSON.parse(request.body.read)
  book = DB.exec_params("INSERT INTO books(bookname, author) values ($1, $2)", [data["bookname"], data["authorname"]])
  if book
    puts book
    # File.append('.\books.json', JSON.pretty_generate(books))
    {message: "Book added Successfully"}.to_json
  else
    {message: "Error adding Book details"}
  end

end

post '/admin/delete' do
  data = JSON.parse(request.body.read)
  bookname = data["bookname"]

  result = DB.exec_params("DELETE FROM books WHERE TRIM(LOWER(bookname)) = TRIM(LOWER($1))", [bookname.strip.downcase])
  if result.cmd_tuples > 0
    {message: "Book deleted successfully"}.to_json
  else
    status 404
    {error: "Book not found"}.to_json
  end
end


post '/admin/modify' do
  data = JSON.parse(request.body.read)
  # if data["bookname"].nil
  result = DB.exec_params("UPDATE books SET bookname = $1, author = $2 WHERE bookname = $3", [data["mod_bookname"], data["mod_authname"], data["bookname"]]).first
  {message: "Book Details are modified"}.to_json
end