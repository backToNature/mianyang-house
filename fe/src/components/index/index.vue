<template>
    <div id="doc">
        <div id="hd">
            <common-header></common-header>
        </div>
        <div id="bd">
            <div id="left">
                <tree></tree>
            </div>
            <div id="right">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>