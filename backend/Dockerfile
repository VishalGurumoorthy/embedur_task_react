# FROM ruby:3.3

# # throw errors if Gemfile has been modified since Gemfile.lock
# RUN bundle config --global frozen 1

# WORKDIR /backend

# COPY Gemfile Gemfile.lock ./
# RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
# RUN bundle lock --add-platform ruby
# RUN bundle lock --add-platform x86_64-linux
# RUN bundle install

# COPY . .
# EXPOSE 4567
# CMD ["ruby", "app.rb"]

FROM ruby:3.3

WORKDIR /backend

COPY Gemfile* ./
RUN bundle install

COPY . .

EXPOSE 4567

CMD ["ruby", "app.rb"]
