# 🌊 Bootcamp Sui Move

## 📋 Sobre el Bootcamp

Este repositorio contiene los desafíos y proyectos desarrollados durante el **Sui MOVE Bootcamp Brasil**. Cada desafío demuestra diferentes conceptos y funcionalidades del lenguaje Move en la plataforma Sui.

### 🎯 Información del Bootcamp

- **Nombre:** Sui MOVE Bootcamp Brasil
- **Período:** Del 3 al 17 de Noviembre
- **Formato:** Clases online
- **Nivel:** Principiante a Intermedio
- **Horario:** 19h a 20h (hora de Brasil)
- **Certificación:** Certificado oficial Sui Developer
- **Flexibilidad:** Las clases quedan grabadas, puedes hacerlas en tu horario

**Organizadores:**
- Sui
- WayLearn
- ParaBuilders

**Inscripciones:** [luma.com/wxsj6hjy](https://luma.com/wxsj6hjy)

## 👨‍💻 Autor

**Cleverson Silva**

## 🚀 Cómo Ejecutar

---

## ⚡ **INSTALADOR DE UN CLIC (RECOMENDADO PARA WINDOWS)**

### 🎯 **La Forma Más Fácil de Comenzar**

Este repositorio incluye un **instalador de un clic** que configura automáticamente todo tu entorno de desarrollo en minutos!

### 📍 **Dónde Encontrarlo**

Navega hasta la carpeta `sui-one-click-installer/` en este repositorio.

### 🚀 **Cómo Usar**

1. **Abre la carpeta del instalador:**
   ```bash
   cd bootcampSui\sui-one-click-installer
   ```

2. **Ejecuta el instalador:**
   - Haz clic derecho en `Install Sui (run as administrator).bat`
   - Selecciona **"Ejecutar como administrador"**
   - O simplemente haz doble clic (el script solicitará permisos automáticamente)

3. **Espera la instalación** (5-10 minutos dependiendo de tu velocidad de internet)

4. **Verifica la instalación:**
   - Abre una **ventana PowerShell NUEVA** (importante: cierra y abre nuevamente)
   - Ejecuta:
     ```bash
     sui --version
     git --version
     code --version
     ```

### 📦 **Lo Que Se Instalará Automáticamente**

✅ **Chocolatey** - Gestor de paquetes para Windows  
✅ **Sui CLI** - Última versión (herramienta de línea de comandos para blockchain Sui)  
✅ **Git** - Sistema de control de versiones  
✅ **Visual Studio Code** - Editor de código  
✅ **Extensiones de VS Code:**
   - Prettier Move (formateo de código)
   - Sui Move (resaltado de sintaxis e IntelliSense)
   - Move Syntax (soporte adicional de sintaxis)  
✅ **Proyecto Sui First Steps** - Descargado y extraído a `C:\bootcampSui`

### 📂 **Ubicación de la Instalación**

- **Proyecto:** `C:\bootcampSui` (o `C:\bootcampSui_YYYYMMDD` si la carpeta ya existe)
- **Archivo de log:** `installation_sui.log` (en la carpeta del instalador)

### ⚠️ **Notas Importantes**

- **Ejecutar como administrador** - Necesario para instalar software
- **Cerrar y abrir terminal** - Después de la instalación, abre un nuevo PowerShell para usar comandos
- **Verificar archivo de log** - Si algo falla, consulta `installation_sui.log` para detalles

### 📖 **Instrucciones Detalladas**

Para instrucciones completas paso a paso, consulta:
- 📄 `sui-one-click-installer/README.txt` (Inglés)
- 📄 Este archivo (README.es.md) - Documentación completa

---

### 🔧 **Instalación Manual (Alternativa)**

Si prefieres instalar manualmente o estás en otro sistema operativo:

1. **Instalar Sui CLI:**
   - Sigue las instrucciones en: [Sui Documentation](https://docs.sui.io/build/install)
   - Verifica la instalación: `sui --version`

2. **Instalar Git:**
   - Windows: [Git for Windows](https://git-scm.com/download/win)
   - Verifica: `git --version`

3. **Instalar VS Code:**
   - [VS Code Download](https://code.visualstudio.com/)
   - Verifica: `code --version`

### 🏃 Ejecutar las Pruebas

Después de la instalación, navega hasta el directorio del proyecto:
```bash
cd bootcampSui
```

Y ejecuta las pruebas:

```bash
sui move test
```

Esto ejecutará todas las pruebas de todos los desafíos en el proyecto.

## 📁 Estructura del Proyecto

```
bootcampSui/
├── Move.toml              # Configuración del paquete Move
├── README.md              # Archivo principal (índice multi-idioma)
├── .gitignore             # Archivos ignorados por Git
├── docs/                  # Documentación
│   ├── README.pt.md       # Versión en portugués
│   ├── README.en.md       # Versión en inglés
│   └── README.es.md        # Versión en español (este archivo)
├── sui-one-click-installer/  # Scripts de instalación automática
│   ├── Install Sui (run as administrator).bat  # Instalador principal (Windows)
│   ├── script_sui.ps1      # Script PowerShell de instalación
│   └── README.txt          # Instrucciones del instalador
└── sources/
    └── desafios/                  # Carpeta de desafíos
        ├── desafio_logo.move          # Desafío 01: Logo ASCII
        ├── desafio_contador.move      # Desafío 02: Contador
        ├── desafio_lista_tarefas.move # Desafío 03: Lista de Tareas
        └── ...                        # Más desafíos se agregarán aquí
```

## 📚 Desafíos

### Desafío 01: Logo ASCII 🎨

**Archivo:** `sources/desafios/desafio_logo.move`

**Objetivo:** Imprimir el logo ASCII de Sui usando funciones auxiliares y bucles.

**Conceptos Demostrados:**
- Funciones auxiliares
- Bucles (`while`)
- Vectores de bytes
- Pruebas unitarias

**Cómo ejecutar:**
```bash
cd bootcampSui
sui move test desafio_logo
```

**Resultado Esperado:**
El comando imprime el logo ASCII completo de Sui en la consola.

---

### Desafío 02: Contador 🔢

**Archivo:** `sources/desafios/desafio_contador.move`

**Objetivo:** Implementar varias funciones de contador usando bucles y lógica condicional.

**Conceptos Demostrados:**
- Bucles (`while`)
- Reasignación de variables
- Parámetros de funciones
- Múltiples implementaciones de contador:
  - Contar de 1 hasta N
  - Contar de inicio hasta fin
  - Cuenta regresiva
  - Contar con intervalo personalizado
  - Contar con mensaje personalizado

**Cómo ejecutar:**
```bash
cd bootcampSui
sui move test desafio_contador
```

**Resultado Esperado:**
El comando ejecuta todas las funciones de contador y muestra los resultados de la cuenta en la consola.

---

### Desafío 03: Lista de Tareas 📝

**Archivo:** `sources/desafios/desafio_lista_tarefas.move`

**Objetivo:** Implementar un contrato inteligente de Lista de Tareas con operaciones CRUD (Create, Read, Update, Delete).

**Conceptos Demostrados:**
- Structs con habilidades `key` y `store`
- Creación y transferencia de objetos
- Referencias mutables (`&mut`)
- Operaciones con vectores
- Funciones entry para interacción con blockchain
- Manejo de errores con `abort`

**Funciones:**
- `new()` - Crea una nueva lista de tareas vacía
- `adicionar_tarefa()` - Añade una tarea a la lista
- `remover_tarefa()` - Elimina una tarea por índice
- `alterar_tarefa()` - Modifica una tarea por índice
- `quantidade_tarefas()` - Retorna el número de tareas
- `obter_tarefa()` - Obtiene una tarea por índice
- `listar_tarefas()` - Lista todas las tareas (para depuración)
- `limpar_tarefas()` - Limpia todas las tareas

**Cómo probar:**
```bash
cd bootcampSui
sui move test desafio_lista_tarefas
```

**Cómo publicar:**
```bash
cd bootcampSui
sui client publish
```

**Cómo usar (después de publicar):**
```bash
# Crear una nueva lista de tareas
sui client call --package <PACKAGE_ID> --module desafio_lista_tarefas --function new --gas-budget 100000000

# Añadir una tarea
sui client call --package <PACKAGE_ID> --module desafio_lista_tarefas --function adicionar_tarefa --args <LIST_OBJECT_ID> "Mi tarea" --gas-budget 100000000

# Modificar una tarea (índice 0)
sui client call --package <PACKAGE_ID> --module desafio_lista_tarefas --function alterar_tarefa --args <LIST_OBJECT_ID> 0 "Tarea modificada" --gas-budget 100000000

# Eliminar una tarea (índice 0)
sui client call --package <PACKAGE_ID> --module desafio_lista_tarefas --function remover_tarefa --args <LIST_OBJECT_ID> 0 --gas-budget 100000000
```

**Resultado Esperado:**
Las pruebas demuestran todas las operaciones CRUD en una lista de tareas almacenada en la blockchain Sui.

---

*Se agregarán más desafíos a medida que progrese el bootcamp.*

## 🔍 Conceptos Básicos de Move

### Conceptos Principales

#### 1. Módulos
En Move, el código se organiza en módulos. Es similar a tener una clase o conjunto de funciones estáticas.

```move
module introducao::desafio_logo {
    // código aquí
}
```

#### 2. Funciones
- Funciones privadas: `fun nombre_funcion()`
- Funciones públicas: `public fun nombre_funcion()`
- Funciones de prueba: `#[test] fun nombre_funcion()`

#### 3. Tipos de Datos
- `u8`, `u16`, `u32`, `u64`: Enteros sin signo
- `bool`: Booleano (true/false)
- `vector<T>`: Vector/array de elementos del tipo T
- `address`: Dirección en la blockchain

#### 4. Bucles
Move usa `while` para bucles:

```move
let i = 0;
while (i < 10) {
    // código aquí
    i = i + 1;
}
```

## 🧪 Pruebas

Cada desafío contiene pruebas unitarias marcadas con `#[test]`.

### Ejecutar todas las pruebas:
```bash
sui move test
```

### Ejecutar una prueba específica:
```bash
sui move test nombre_de_la_prueba
```

## 📚 Conceptos Aprendidos

- ✅ **Funciones auxiliares**: Reutilización de código
- ✅ **Bucles (`while`)**: Repetición de operaciones
- ✅ **Vectores de bytes**: Manipulación de strings en Move
- ✅ **Pruebas unitarias**: Validación del código
- ✅ **Modularización**: Organización del código en funciones
- ✅ **Constantes**: Definición de valores fijos
- ✅ **Imports**: Uso de bibliotecas estándar

## 🛠️ Tecnologías

- **Lenguaje**: Move (Sui)
- **Plataforma**: Sui Blockchain
- **CLI**: Sui CLI
- **Editor**: VS Code (recomendado)

## 📖 Referencias

- [Documentación Move](https://move-language.github.io/move/)
- [Documentación Sui](https://docs.sui.io/)
- [Move Book](https://move-book.com/)
- [Sui Developers](https://sui.io/developers)

## 📝 Notas del Desarrollador

Este bootcamp fue un viaje de aprendizaje desde la programación tradicional hacia Move. Entender los conceptos únicos de Move ayuda a construir aplicaciones blockchain seguras.

### Consejos para Principiantes:

1. **Los tipos son obligatorios**: Move es fuertemente tipado
2. **La propiedad es importante**: Move usa un sistema de propiedad único
3. **Las pruebas son esenciales**: Usa `#[test]` para validar tu código
4. **Los strings son bytes**: En Move, los strings son `vector<u8>` y necesitan ser convertidos

## 📄 Licencia

Este proyecto es parte del Bootcamp Sui Move y se usa con fines educativos.

---

**Desarrollado con ❤️ por Cleverson Silva**

*Bootcamp Sui Move - 2025*

