Rails.application.routes.draw do

  draw(:assets)
  draw(:devise)

  authenticated :user do
    draw(:admin)
    draw(:main)
  end

end
