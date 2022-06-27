FROM ruby:3.0.0
WORKDIR /usr/src/app
RUN apt-get update -qq && apt-get install -y build-essential
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . .

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
