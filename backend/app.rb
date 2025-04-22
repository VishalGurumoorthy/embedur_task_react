require 'sinatra'
require 'json'
require 'sinatra/cross_origin'

set :port, 4567
set :bind, '0.0.0.0'

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

# Login endpoint
post '/login' do
  request.body.rewind
  data = JSON.parse(request.body.read) rescue {}

  if data["email"] && data["password"]
    { success: true, message: "Login successful" }.to_json
  else
    status 400
    { success: false, message: "Missing credentials" }.to_json
  end
end

# Book list endpoint
get '/books' do
  books = File.read("books.json")
  books
end