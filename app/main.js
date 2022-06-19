import {loadGLTF} from "../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './assets/targets/target.mind'
        });
        
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const model = await loadGLTF('./assets/models/scene.gltf');
        model.scene.scale.set(0.5, 0.5, 0.5);
        model.scene.rotation.set(Math.PI/2, Math.PI/2, 0);
        model.scene.position.set(-0.067, -1.15, 0);

        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(model.scene);
    
        await mindarThree.start();
        renderer.setAnimationLoop( () => {
            renderer.render(scene, camera);
        });
    }
    start();
});