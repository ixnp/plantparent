class PlantsController < ApplicationController
  def index
    @books = Book.all
    render json: @book
  end

  def show
    @book = Book.find(params[:id])
    render json: @book
  end
end
