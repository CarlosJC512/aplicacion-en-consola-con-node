require('colors');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const Tareas = require('./models/tareas');

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if( tareasDB ) {
        //Establecer tareas
        tareas.cargarTareaFromArray( tareasDB );
    }

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                // Crear tarea
                const desc = await leerInput('Descripción:');

                tareas.crearTarea( desc );
            break;

            case '2': //Listado completo de tareas
                tareas.listadoCompleto();
            break;

            case '3': //Listado de tareas completadas
                tareas.tareasCompletadasPendientes();
            break;

            case '4': //listado de tareas pendientes
                tareas.tareasCompletadasPendientes(false);
            break;

            case '5': //Completado | Pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;

            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0' ) {
                    const ok = await confirmar('¿Esta seguro?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea Borrada');
                    }
                }

            break;
        }

        guardarDB( tareas.listadoArr );

        await pausa();

    } while( opt != '0' );


}

main();