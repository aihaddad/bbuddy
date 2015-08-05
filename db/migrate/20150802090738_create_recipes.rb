class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.string     :source
      t.string     :favicon
      t.string     :url
      t.text       :description
      t.string     :title
      t.string     :image_url
      t.boolean    :extractable
      t.references :user

      t.timestamps null: false
    end

    add_index :recipes, :user_id
    add_index :recipes, :title
  end
end
