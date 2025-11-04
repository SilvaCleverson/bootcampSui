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

### 🔧 Instalación Automática (Windows)

Este proyecto incluye un instalador de un clic para Windows que instala automáticamente:
- **Sui CLI**
- **Git**
- **Visual Studio Code**

#### Paso a Paso:

1. **Navega hasta la carpeta `instalador`:**
   ```bash
   cd bootcampSui\instalador
   ```

2. **Ejecuta el instalador:**
   - Haz clic derecho en `Instalar_Sui.bat`
   - Selecciona **"Ejecutar como administrador"**
   - O simplemente haz doble clic (el script solicitará permisos automáticamente)

3. **Espera la instalación:**
   - El instalador usará Chocolatey para instalar los programas
   - Todo el proceso se registrará en el archivo `instalacao_sui.log`

4. **Verifica la instalación:**
   - Abre un **PowerShell nuevo** (importante: cierra y abre nuevamente)
   - Ejecuta los comandos para verificar:
     ```bash
     sui --version
     git --version
     code --version
     ```

5. **Próximos pasos después de la instalación:**
   ```bash
   # Configurar el cliente Sui
   sui client
   
   # Seleccionar la red (testnet/devnet/mainnet)
   # Crear nueva dirección
   sui client new-address ed25519
   
   # Obtener tokens de prueba (si es necesario)
   sui client faucet
   ```

#### ⚠️ Solución de Problemas

- Si algún comando no es reconocido después de la instalación, **cierra y abre una nueva terminal**
- Si la instalación falla, consulta el archivo `instalacao_sui.log` en la carpeta `instalador`
- Asegúrate de ejecutar como administrador

### 📦 Instalación Manual

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
├── README.pt.md           # Versión en portugués
├── README.en.md           # Versión en inglés
├── README.es.md           # Versión en español (este archivo)
├── .gitignore             # Archivos ignorados por Git
├── instalador/            # Scripts de instalación automática
│   ├── Instalar_Sui.bat   # Instalador principal (Windows)
│   ├── script_sui.ps1      # Script PowerShell de instalación
│   └── README.txt          # Instrucciones del instalador
└── sources/
    ├── desafio_logo.move  # Desafío 01: Logo ASCII
    └── ...                # Más desafíos se agregarán aquí
```

## 📚 Desafíos

### Desafío 01: Logo ASCII 🎨

**Archivo:** `sources/desafio_logo.move`

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

