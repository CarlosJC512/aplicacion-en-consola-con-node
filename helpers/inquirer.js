const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.brightCyan} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.brightCyan} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.brightCyan} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.brightCyan} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.brightCyan} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.brightCyan} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.brightCyan} Salir`
            }
        ]
    }
];

const inquirerMenu = async () => {
    
    console.clear();
    console.log('=================================='.green.bold);
    console.log('       Selecione una opción'.brightMagenta.bold);
    console.log('==================================\n'.green.bold);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa =  async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${ 'ENTER'.blue } para continuar\n`
        }
    ]

    await inquirer.prompt(question);
}

const leerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt( question );
    return desc;
}

const listadoTareasBorrar = async( tareas = [] ) => {
    const choices = tareas.map( (tarea, i) => {
        
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`
        }
    } );

    choices.unshift({
        value: '0',
        name: '0'.green + '. Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt( preguntas );

    return id;
}

const confirmar = async( message ) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt( pregunta );
    return ok;
}

const mostrarListadoChecklist = async( tareas = [] ) => {
    const choices = tareas.map( (tarea, i) => {
        
        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    } );

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt( preguntas );

    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}