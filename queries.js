const pool = require("./dbConfig");

// Función para ejecutar una consulta SQL
// async function consultaSQL() {
//   // Obtenemos una conexión de la pool
//   const client = await pool.connect();

//   try {
//     // Ejecutamos la consulta SQL
//     const result = await client.query("SELECT * FROM alumno");

//     // Mostramos los resultados
//     console.log(result.rows);
//   } catch (error) {
//     console.error("Error al ejecutar la consulta:", error);
//   } finally {
//     // Liberamos la conexión
//     client.release();
//   }
// }


const command = process.argv[2];
const data1 = process.argv[3];
const data2 = process.argv[4];
const data3 = process.argv[5];
const data4 = process.argv[6];

// Función para insertar un usuario
const insertUser = async () => {
  const text = "INSERT INTO alumno(nombre, rut, curso, nivel) VALUES($1, $2, $3, $4)";
  const values = [data1, data2, data3 , data4];

  const response = await pool.query(text, values);
  console.log(response);
};
// Función para consultar todos
const consulta1 = async () => {
  const text = 'SELECT * FROM alumno';
  const response = await pool.query(text);
  console.log(response.rows);
};
// Función para eliminar un usuario
const deleteUser = async (rut) => {
  const text = "DELETE FROM alumno WHERE rut = $1";
  const values = [rut];
console.log(data1);
console.log(rut);
  try {
    const response = await pool.query(text, values);
    console.log(response);
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
};
//funcion para consultar por rut
const consulta2 = async (rut) => {
  const text = 'SELECT * FROM alumno WHERE rut = $1';
  const values = [rut];
  const response = await pool.query(text, values);
  return response.rows[0];
};
// Función para actualizar un usuario
const updateUser = async () => {
  const text = "UPDATE alumno SET nombre = $1, rut = $2 , curso = $3, nivel = $4 WHERE rut = $2";
  const values = [data1, data2, data3 , data4];

  const response = await pool.query(text, values);
  console.log(response);
};

if (command === 'nuevo') {
  insertUser(data1, data2, data3, data4)
    .then(() => {
      console.log('Usuario insertado correctamente.');
    })
    .catch((error) => {
      console.error('Error al insertar usuario:', error);
    });
}

if (command === 'consulta') {
  consulta1()
    .then((result) => {
      console.log('Resultado de la consulta:', result);
    })
    .catch((error) => {
      console.error('Error en la consulta:', error);
    });
}
if (command === 'editar') {
  updateUser(data1, data2, data3, data4)
    .then((response) => {
      console.log('Usuario actualizado correctamente:', response);
    })
    .catch((error) => {
      console.error('Error al actualizar usuario:', error);
    });
}
if (command === 'rut') {
  consulta2(data1)
    .then((result) => {
      console.log('Resultado de la consulta:', result);
    })
    .catch((error) => {
      console.error('Error en la consulta:', error);
    });
}
if (command === 'eliminar') {
  deleteUser(data1)
    .then(() => {
      console.log(data1)
      console.log('Usuario eliminado correctamente.');
    })
    .catch((error) => {
      console.error('Error al eliminar usuario:', error);
    });
}
module.exports = { insertUser, deleteUser, updateUser, consulta1, consulta2 };
