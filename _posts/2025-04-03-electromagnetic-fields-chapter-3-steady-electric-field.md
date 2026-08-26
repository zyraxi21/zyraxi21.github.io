---
layout: post
title: 第 3 章    恒定电场
category: 电磁场与电磁波
tags: [考前复习, 电磁场与电磁波]
excerpt: "电磁场与电磁波恒定电场章节公式整理。"
---

稳恒电场：外加电源产生 $\to$ 不随时间变化的电场 $\to$ 电荷空间分布不随时间变化。

# 3.1    电流强度和电流密度

## 3.1.1    电流强度
$\begin{cases}按媒质 \left \{ \begin{align}&传导电流 \to 导电媒质\\&运流电流 \to 真空或气体\end{align}\right\}自由电流 \\按时变性\begin{cases}恒定电流\ I=\frac{\Delta q}{\Delta t}\\时变电流\ I=\lim_{ \Delta t \to 0 } \frac{\Delta q}{\Delta t}= \frac{\mathrm{d}q}{\mathrm{d}t}\end{cases}\end{cases}$
单位：$\mathrm{A}$。

## 3.1.2    电流密度
电流密度矢量
- 方向：在导体中某点上正电荷运动的方向
- 大小：通过该点单位垂直截面的电流强度
$$\boldsymbol{J}=\boldsymbol{a}_{n}\lim_{ \Delta s \to 0 } \frac{\Delta I}{\Delta s} =\boldsymbol{a}_{n} \frac{\mathrm{d}I}{\mathrm{d}s}$$
其中 $\boldsymbol{a}_{n}$ 为正电荷运动的方向。单位：$\mathrm{A /m^{2}}$。

体电流密度：电荷在某一体积中流动形成的电流。
通过导体中任意截面 $S$ 的电流强度$$I=\int_{S}\boldsymbol{J\cdot}\mathrm{d}\boldsymbol{s}$$

面电流密度：
面电流密度矢量用 $\boldsymbol{J}_{\mathrm{s}}$ 来表示，定义为垂直于电流方向的单位长度上流过的电流强度。$$\boldsymbol{J}_{\mathrm{s}}=\boldsymbol{a}_{t}\lim_{ \Delta l \to 0 } \frac{\Delta I}{\Delta l}=\boldsymbol{a}_{t} \frac{\mathrm{d}I}{\mathrm{d}l}$$其中 $\boldsymbol{a}_{n}$ 为正电荷运动的方向。单位：$\mathrm{A /m}$。
$$\mathrm{d}I=\boldsymbol{J}_{\mathrm{s}}\boldsymbol{\cdot}\mathrm{d}\boldsymbol{l}$$

电流元 $I\mathrm{d}\boldsymbol{l}$：通过线元 $\mathrm{d}\boldsymbol{l}$ 的电流大小为 $I$：$$I\mathrm{d}\boldsymbol{l}=\begin{cases}\boldsymbol{J}\mathrm{d}v\quad \text{（体电流）}\\\boldsymbol{J}_{\mathrm{s}}\mathrm{d}s\quad \text{（面电流）}\\I\mathrm{d}\boldsymbol{l}\quad \text{（线电流）}\end{cases}$$

# 3.2    电流的连续性方程和恒定条件
电流连续性方程的微分形式：$$\boxed{\nabla \boldsymbol{\cdot J}=- \frac{\partial \rho}{\partial t}}$$积分形式：$$\oint_{S}\boldsymbol{J\cdot}\mathrm{d}\boldsymbol{s}=- \frac{\mathrm{d}q}{\mathrm{d}t}=-\int_{V} \frac{\partial \rho}{\partial t}\mathrm{d}v$$
电流的恒定条件的积分形式：$$\oint_{S}\boldsymbol{J\cdot}\mathrm{d}\boldsymbol{s}=0$$
恒定电场的基本方程：
微分形式：$$\begin{cases}\nabla \boldsymbol{\cdot J}=0\\\nabla \times \boldsymbol{E}=\boldsymbol{0}\end{cases}$$
积分形式：$$\begin{cases}\oint_{S}\boldsymbol{J\cdot}\mathrm{d}\boldsymbol{s}=0\\\oint_{C}\boldsymbol{E\cdot}\mathrm{d}\boldsymbol{l}=0\end{cases}$$
物理意义：恒定电流矢量为无源场，恒定电流的电流线不可能在任何地方中断，它们永远是闭合曲线。稳恒电路必须是闭合的。

# 3.3    欧姆定律

## 3.3.2    电阻率和电导率
导体电阻的大小与导体的材料和几何形状有关。$$R=\rho \frac{l}{S}$$式中，$\rho$ 称为材料的电阻率，单位为 $\mathrm{\Omega \cdot m}$。

电阻率的倒数称为电导率，用 $\sigma$ 表示$$\sigma= \frac{1}{\rho}$$单位是 $\mathrm{S /m}$。

## 3.3.3    欧姆定律的微分形式
对于各向同性的线性均匀导体，$$\boldsymbol{J}=\sigma \boldsymbol{E}$$该式称为欧姆定律的微分形式（导体媒质的本构关系）。

- 由 $\oint_{S}\boldsymbol{J\cdot}\mathrm{d}\boldsymbol{s}=0$ 可得 $\boldsymbol{n\cdot}(\boldsymbol{J}_{1}-\boldsymbol{J}_{2})=0$ 或 $J_{1n}=J_{2n}$。
- 由 $\oint_{C}\boldsymbol{E\cdot}\mathrm{d}\boldsymbol{l}=0$ 可得 $\boldsymbol{n\times}(\boldsymbol{E}_{1}-\boldsymbol{E}_{2})=0$ 或 $E_{1t}=E_{2t}$。
- 由 $E_{1t}=E_{2t}$ 可得 $\phi_{1}=\phi_{2}$。
- 由 $J_{1n}=J_{2n}$ 可得 $\sigma_{1}E_{1n}=\sigma_{2}E_{2n}$，则 $\sigma_{1} \frac{\partial \phi_{1}}{\partial n}=\sigma_{2} \frac{\partial \phi_{2}}{\partial n}$。

# 3.7    恒定电场与静电场的比较
![图](/assets/images/electromagnetic-fields-and-waves/1743509235719.jpg)
