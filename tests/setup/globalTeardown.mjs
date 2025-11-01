// tests/setup/globalTeardown.mjs
export default async () => {
  console.log('Tearing down test database...');
  // En un entorno de prueba real, aquí se eliminaría la tabla de la base de datos.
  // Como no tenemos acceso a una base de datos de prueba, simulamos el desmontaje.
  console.log('Test database teardown complete.');
};
