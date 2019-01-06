let building = new Image();
building.src = './sprites/OPMon_Center.png';
building.onload = function () {
    initBuilding();
};

const buildingScale = 0.5;
const buildingWidth = 185;
const buildingHeight = 185;
const scaledBuildingHeight = buildingScale * buildingHeight;
const scaledBuildingWidth = buildingScale * buildingWidth;


function drawBuilding(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(building,
        frameX * buildingWidth, frameY * buildingHeight, buildingWidth, buildingHeight,
        canvasX, canvasY, scaledBuildingWidth, scaledBuildingHeight);
}

function initBuilding() {
    drawBuilding(0, 0, 300, 300);
}