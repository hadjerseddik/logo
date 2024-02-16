//@ts-nocheck
import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh
} from 'three'
import { MindARThree } from './Libs/AR/mindar-image-three.prod';
import './style.css'

init()


function init() {
    // ===== 🎥 AR =====
    const Container = document.querySelector("#container");
    const mindarThree = new MindARThree({
        container: Container,
        imageTargetSrc: "/Marker/targets.png"
    });
    Container.classList.add("backgroundColor");
    const { renderer, scene, camera } = mindarThree;
    const anchor = mindarThree.addAnchor(0);
    // cube
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
    const cube = new Mesh(geometry, material);

    anchor.group.add(cube);
 
    const start = async () => {
        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }
    const startButton = document.querySelector("#startButton");
    startButton.addEventListener("click", () => {
        Container.classList.remove("backgroundColor");
        start();
    });
    const stopButton = document.querySelector("#stopButton");
    stopButton.addEventListener("click", () => {
        mindarThree.stop();
        mindarThree.renderer.setAnimationLoop(null);
        Container.classList.add("backgroundColor");
    });
}


