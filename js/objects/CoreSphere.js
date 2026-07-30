import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export function createCoreSphere(scene) {

    const group = new THREE.Group();

    //----------------------------------
    // ESFERA
    //----------------------------------

    const geometry = new THREE.SphereGeometry(

        1.1,

        64,

        64

    );

    const material = new THREE.MeshPhysicalMaterial({

        color: 0x161018,

        roughness: 0.35,

        metalness: 0.15,

        clearcoat: 1,

        clearcoatRoughness: 0

    });

    const sphere = new THREE.Mesh(

        geometry,

        material

    );

    group.add(sphere);

    //----------------------------------
    // HALO
    //----------------------------------

    const haloGeometry = new THREE.SphereGeometry(

        1.45,

        64,

        64

    );

    const haloMaterial = new THREE.MeshBasicMaterial({

        color: 0xB987FF,

        transparent: true,

        opacity: 0.08,

        side: THREE.BackSide

    });

    const halo = new THREE.Mesh(

        haloGeometry,

        haloMaterial

    );

    group.add(halo);

    //----------------------------------

    return {

        object: group,

        update() {

            group.rotation.y += 0.002;

            const pulse =

                1 +

                Math.sin(

                    performance.now() * 0.0015

                ) * 0.01;

            group.scale.set(

                pulse,

                pulse,

                pulse

            );

        }

    };

}