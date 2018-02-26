import { DragDropContext } from 'react-dnd';
import { default as TouchBackend } from 'react-dnd-touch-backend';

export default DragDropContext(TouchBackend({ enableMouseEvents: true }));