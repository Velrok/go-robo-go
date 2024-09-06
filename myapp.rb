# frozen_string_literal: true
require 'sinatra'

get '/' do
  File.read('./public/index.html')
end
