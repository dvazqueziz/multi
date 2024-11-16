module Main
  class BaseController < ApplicationController

    protected

    def layout_by_resource
      'main/application'
    end

  end
end