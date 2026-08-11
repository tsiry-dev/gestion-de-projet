import "dotenv/config";
import mongoose from "mongoose";

import { config } from "@/config/app.config";
import UserModel from "@/models/user.model";
import { hashPassword } from "@/shared/utils/bcript";





async function seed() {
  try {
    await mongoose.connect(config.MONGODB_URI);

    console.log("🟢 MongoDB connecté");

    await UserModel.deleteMany({});

    console.log("🗑 Anciennes données supprimées");

    const password = await hashPassword("password");

  const users = [
    { name: "Alice Martin", email: "alice.martin@gmail.com", password },
    { name: "Lucas Bernard", email: "lucas.bernard@yahoo.com", password },
    { name: "Emma Robert", email: "emma.robert@outlook.com", password },
    { name: "Noah Petit", email: "noah.petit@hotmail.com", password },
    { name: "Léa Dubois", email: "lea.dubois@gmail.com", password },
    { name: "Nathan Moreau", email: "nathan.moreau@yahoo.com", password },
    { name: "Chloé Simon", email: "chloe.simon@outlook.com", password },
    { name: "Louis Laurent", email: "louis.laurent@gmail.com", password },
    { name: "Sarah Michel", email: "sarah.michel@hotmail.com", password },
    { name: "Hugo Garcia", email: "hugo.garcia@yahoo.com", password },
    { name: "Camille Roux", email: "camille.roux@gmail.com", password },
    { name: "Jules David", email: "jules.david@outlook.com", password },
    { name: "Inès Bertrand", email: "ines.bertrand@hotmail.com", password },
    { name: "Tom Leroy", email: "tom.leroy@gmail.com", password },
    { name: "Manon Faure", email: "manon.faure@yahoo.com", password },
    { name: "Enzo Bonnet", email: "enzo.bonnet@outlook.com", password },
    { name: "Clara Gauthier", email: "clara.gauthier@gmail.com", password },
    { name: "Mathis Chevalier", email: "mathis.chevalier@hotmail.com", password },
    { name: "Zoé Perrin", email: "zoe.perrin@yahoo.com", password },
    { name: "Gabriel Masson", email: "gabriel.masson@gmail.com", password },
  ];


      await UserModel.insertMany(users);


    console.log(`✅ ${users.length} users créés`);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Déconnecté");
  }
}

seed();