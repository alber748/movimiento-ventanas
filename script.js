document.addEventListener('DOMContentLoaded', () => {
      const createWindowButton = document.getElementById('createWindowButton');
      const desktop = document.getElementById('desktop');
      let windowCount = 0;
      const initialPosition = { top: 50, left: 50 }; // Posición inicial para las nuevas ventanas
      const windows = []; // Array para almacenar las ventanas creadas
      let maxZIndex = 100; // Valor inicial para el z-index, usado para llevar las ventanas al frente
  
      // Evento para crear una nueva ventana cuando se hace clic en el botón
      createWindowButton.addEventListener('click', createWindow);
  
      // Función para crear una nueva ventana
      function createWindow() {
          const windowElement = createWindowElement();
          const position = getNextPosition();
          setPosition(windowElement, position);
  
          const titleBar = createTitleBar();
          const content = createContent();
          windowElement.appendChild(titleBar);
          windowElement.appendChild(content);
  
          desktop.appendChild(windowElement);
          windows.push({ element: windowElement, initialPosition: position, hasMoved: false });
          addEventListeners(windowElement, titleBar);
      }
  
      // Función para crear el elemento de la ventana
      function createWindowElement() {
          const windowElement = document.createElement('div');
          windowElement.className = 'window';
          windowElement.id = `window${++windowCount}`;
          return windowElement;
      }
  
      // Función para establecer la posición de la ventana
      function setPosition(element, position) {
          element.style.top = `${position.top}px`;
          element.style.left = `${position.left}px`;
      }
  
      // Función para crear la barra de título de la ventana
      function createTitleBar() {
          const titleBar = document.createElement('div');
          titleBar.className = 'title-bar';
          titleBar.textContent = `Window ${windowCount}`;
          return titleBar;
      }
  
      // Función para crear el contenido de la ventana
      function createContent() {
          const content = document.createElement('div');
          content.className = 'content';
          content.textContent = `Content of window ${windowCount}`;
          return content;
      }
  
      // Función para añadir eventos a la ventana
      function addEventListeners(windowElement, titleBar) {
          makeWindowDraggable(windowElement, titleBar);
          makeWindowClickable(windowElement);
      }
  
      // Función para obtener la siguiente posición disponible para la nueva ventana
      function getNextPosition() {
          const initialUnmovedWindow = windows.find(win =>
              !win.hasMoved &&
              win.initialPosition.top === initialPosition.top &&
              win.initialPosition.left === initialPosition.left
          );
  
          if (!initialUnmovedWindow) {
              return { ...initialPosition };
          }
  
          let position = { ...initialPosition };
          const offset = 30; // Desplazamiento para evitar que las ventanas se sobrepongan
  
          while (isPositionOccupied(position)) {
              position.top += offset;
              position.left += offset;
          }
  
          return position;
      }
  
      // Función para verificar si una posición ya está ocupada por otra ventana
      function isPositionOccupied(position) {
          return windows.some(win => {
              const top = parseInt(win.element.style.top, 10);
              const left = parseInt(win.element.style.left, 10);
              return top === position.top && left === position.left;
          });
      }
  
      // Función para hacer que la ventana sea arrastrable
      function makeWindowDraggable(windowElement, titleBar) {
          let isDragging = false;
          let offsetX, offsetY;
  
          titleBar.addEventListener('mousedown', (e) => {
              isDragging = true;
              offsetX = e.clientX - windowElement.offsetLeft;
              offsetY = e.clientY - windowElement.offsetTop;
              windowElement.style.zIndex = ++maxZIndex; // Lleva la ventana al frente
          });
  
          document.addEventListener('mousemove', (e) => {
              if (isDragging) {
                  windowElement.style.left = `${e.clientX - offsetX}px`;
                  windowElement.style.top = `${e.clientY - offsetY}px`;
              }
          });
  
          document.addEventListener('mouseup', () => {
              if (isDragging) {
                  const windowObj = windows.find(win => win.element === windowElement);
                  const initialPositionKey = `${initialPosition.top},${initialPosition.left}`;
                  const windowPositionKey = `${parseInt(windowElement.style.top, 10)},${parseInt(windowElement.style.left, 10)}`;
  
                  if (windowObj.initialPosition.top === initialPosition.top &&
                      windowObj.initialPosition.left === initialPosition.left &&
                      windowPositionKey !== initialPositionKey) {
                      windowObj.hasMoved = true;
                  }
              }
              isDragging = false;
          });
      }
  
      // Función para hacer que la ventana se lleve al frente al hacer clic
      function makeWindowClickable(windowElement) {
          windowElement.addEventListener('click', () => {
              windowElement.style.zIndex = ++maxZIndex;
          });
      }
  });
  