// Uso: npm run seed  -> carga las 12 guitarras originales si la tabla está vacía
import dotenv from "dotenv";
dotenv.config();
import db from "./config/db";
import Guitar from "./models/Guitar.model";

const guitars = [
  { brand: "GuitarLA", name: "Lukather", image: "guitarra_01", price: 299, description: "Versatilidad pura y tono cristalino. Diseñada para sesiones de estudio exigentes y solos épicos con un sustain increíble." },
  { brand: "GuitarLA", name: "SRV", image: "guitarra_02", price: 349, description: "El alma del Texas blues. Pastillas de alta salida y un mástil robusto para un tono grueso, rasgado y lleno de sentimiento." },
  { brand: "GuitarLA", name: "Borland", image: "guitarra_03", price: 329, description: "Estética radical y sonido aplastante. Perfecta para riffs pesados, afinaciones bajas y experimentación sonora sin límites." },
  { brand: "GuitarLA", name: "VAI", image: "guitarra_04", price: 299, description: "La herramienta definitiva para virtuosos. Cuenta con un puente flotante ultra estable y trastes optimizados para velocidad extrema." },
  { brand: "GuitarLA", name: "Thompson", image: "guitarra_05", price: 399, description: "Un clásico atemporal. Ideal para fingerpicking complejo y tonos limpios que cortan la mezcla con una claridad absoluta." },
  { brand: "GuitarLA", name: "White", image: "guitarra_06", price: 329, description: "Sonido crudo, vintage y directo. Construcción minimalista diseñada para sacar el máximo fuzz y carácter garage rock." },
  { brand: "GuitarLA", name: "Cobain", image: "guitarra_07", price: 349, description: "Actitud grunge en su máxima expresión. Cuerpo asimétrico, humbuckers potentes y lista para desatar el caos en el escenario." },
  { brand: "GuitarLA", name: "Dale", image: "guitarra_08", price: 379, description: "La reina del surf rock. Tonos brillantes y ataque rápido para un sonido percusivo e inconfundible bañado en reverb." },
  { brand: "GuitarLA", name: "Krieger", image: "guitarra_09", price: 289, description: "Tonos cálidos y psicodélicos. Su configuración captura la esencia del rock de los 60 con un toque sutil de jazz y blues." },
  { brand: "GuitarLA", name: "Campbell", image: "guitarra_10", price: 349, description: "El motor del rock americano. Confiable, elegante y con ese brillo característico perfecto para ritmos sólidos y melodías memorables." },
  { brand: "GuitarLA", name: "Reed", image: "guitarra_11", price: 399, description: "Experimental y vanguardista. Ofrece texturas sónicas únicas, ideal para afinaciones alternativas y ritmos hipnóticos." },
  { brand: "GuitarLA", name: "Hazel", image: "guitarra_12", price: 379, description: "Magia funk y psicodelia pura. Dinámica excepcional diseñada para grooves infecciosos y solos extendidos llenos de expresividad." }
];

async function seed() {
  try {
    await db.authenticate();
    await db.sync({ alter: true });
    const count = await Guitar.count();
    if (count > 0) {
      console.log(`La tabla guitars ya tiene ${count} registros. No se insertó nada.`);
    } else {
      await Guitar.bulkCreate(guitars);
      console.log(`Se insertaron ${guitars.length} guitarras.`);
    }
  } catch (error) {
    console.log(error);
    process.exitCode = 1;
  } finally {
    await db.close();
  }
}

seed();
