---
layout: post
title: 第 2 章    静电场
category: 电磁场与电磁波
tags: [考前复习, 电磁场与电磁波]
excerpt: "电磁场与电磁波静电场章节公式整理。"
---

相对于观察者静止且量值不随时间变化的电荷称为静电荷。

# 2.1    电荷

## 1. 体电荷密度
$$\rho=\lim_{ \Delta v \to 0 } \frac{\Delta q}{\Delta v} = \frac{\mathrm{d}q}{\mathrm{d}v}$$单位：$\mathrm{C/m^{3}}$。

$\Delta v$：物理无穷小。宏观上足够小，微观上足够大。

区域 $V$ 中的总电荷：$q=\int_{V}\rho(\boldsymbol{r})\mathrm{d}v$。

## 2. 面电荷密度
$$\rho_{\mathrm{s}}=\lim_{ \Delta s \to 0 } \frac{\Delta q}{\Delta s}=\frac{\mathrm{d}q}{\mathrm{d}s}$$单位：$\mathrm{C /m^{2}}$。

## 3. 线电荷密度
$$\rho_{\mathrm{l}}=\lim_{ \Delta l \to 0 } \frac{\Delta q}{\Delta l}= \frac{\mathrm{d}q}{\mathrm{d}l}$$单位：$\mathrm{C /m}$。

## 4. 点电荷
描述：
- 体积很小
- 密度很大
- 对整个空间而言总电荷量仍保持为一个单位

用 $\delta$ 函数表示：$$\delta(\boldsymbol{r}-\boldsymbol{r}')=\delta(x-x',y-y',z-z')=\begin{cases}0&(\boldsymbol{r}\neq \boldsymbol{r}')\\ \infty & (\boldsymbol{r}=\boldsymbol{r}')\end{cases}$$ $$\int_{V}\delta(\boldsymbol{r}-\boldsymbol{r}')\mathrm{d}v=\int_{V}\delta(x-x',y-y',z-z')\mathrm{d}x\mathrm{d}y\mathrm{d}z=\begin{cases}0&\text{（积分区域不含 }\boldsymbol{r}'\text{）}\\ 1 & \text{（积分区域包含 }\boldsymbol{r}'\text{）}\end{cases}$$
电荷量为 $q$ 的点电荷若在 $\boldsymbol{r}'$ 处，则电荷密度分布可表示为$$\rho(\boldsymbol{r})=q\delta(\boldsymbol{r}-\boldsymbol{r}')$$
对于分离的 $N$ 个点电荷构成的点电荷系统，电荷密度分布可表示为$$\rho(\boldsymbol{r})=\sum_{i=1}^{N}q_{i}\delta(\boldsymbol{r}-\boldsymbol{r}_{i}')$$

有关 $\delta$ 函数的一些重要性质：
(1) 抽样特性：$$\int_{V}f(\boldsymbol{r})\delta(\boldsymbol{r}-\boldsymbol{r}')\mathrm{d}v=\begin{cases}0 &\text{（积分区域不含 }\boldsymbol{r}'\text{）}\\ f(\boldsymbol{r}') & \text{（积分区域包含 }\boldsymbol{r}'\text{）}\end{cases}$$
(2) $$\nabla^{2}\left( \frac{1}{R} \right)=-4\pi\delta(x-x',y-y',z-z')$$

# 2.2    库仑定律和电场强度

## 2.2.1    库仑定律
$$\boldsymbol{F}_{12}=\frac{q_{1}q_{2}\boldsymbol{R}_{12}}{4\pi \varepsilon_{0}R_{12}^{3}}=\boldsymbol{a}_{R} \frac{q_{1}q_{2}}{4\pi\varepsilon_{0}R_{12}^{2}}$$式中，$\boldsymbol{F}_{12}$ 表示点电荷 $q_{1}$ 对点电荷 $q_{2}$ 的作用力，单位是 $\mathrm{N}$；$\boldsymbol{R}_{12}$ 是由点电荷 $q_{1}$ 指向 $q_{2}$ 的距离矢量；真空（或自由空间）介电常数或电容率：$\varepsilon_{0}=\frac{1}{36\pi \times 10^{9}}\ \mathrm{F /m}\approx 8.85\times 10^{-12}\ \mathrm{F /m}$。

电场力服从叠加原理。

## 2.2.2    电场强度
电荷激发电场，电场作用于电荷。

电场强度矢量的定义：$$\boldsymbol{E}=\frac{\boldsymbol{F}}{q_{0}}=\frac{q\boldsymbol{R}}{4\pi\varepsilon_{0}R^{3}}$$单位为 $\mathrm{V /m}$ 或 $\mathrm{N /C}$。

物理意义：单位电荷在该点所受电场力的大小。

源点：点电荷 $q$ 所在点。
场点：试验电荷 $q_{0}$ 所在点（观察点）。

体电荷在空间任一点产生的电场强度为$$\boldsymbol{E}(\boldsymbol{r})=\frac{1}{4\pi\varepsilon_{0}}\int_{V'} \frac{\rho(\boldsymbol{r}')\boldsymbol{R}}{R^{3}}\mathrm{d}v'$$
面电荷在曲面 $S'$ 产生的电场强度为$$\boldsymbol{E}(\boldsymbol{r})=\frac{1}{4\pi\varepsilon_{0}}\int_{S'} \frac{\rho_{\mathrm{s}}(r')\boldsymbol{R}}{R^{3}}\mathrm{d}s'$$
线电荷在曲线 $L'$ 产生的电场强度为$$\boldsymbol{E}(\boldsymbol{r})=\frac{1}{4\pi\varepsilon_{0}}\int_{L'} \frac{\rho_{\mathrm{l}}(r')\boldsymbol{R}}{R^{3}}\mathrm{d}l'$$

# 2.3    真空中静电场的基本方程

## 2.3.1    静电场的散度和高斯定律
真空中高斯定律的微分形式：$$\boxed{\nabla \boldsymbol{\cdot E}=\frac{\rho}{\varepsilon_{0}}}$$
物理意义：空间任一点上电场强度 $\boldsymbol{E}$ 的散度等于该点的体电荷密度与真空介电常数的比值。

静电场是一个具有通量源的场，静电荷就是静电场的通量源；电荷密度为正称为发散源，电荷密度为负称为汇聚源；电场线从正电荷出发而终止于负电荷。

真空中高斯定律的积分形式：$$\boxed{\oint_{S}\boldsymbol{E\cdot}\mathrm{d}\boldsymbol{s}= \frac{q}{\varepsilon_{0}}}$$

应用：在电场分布具有一定**对称性**的情况下，可以利用高斯定律计算电场强度。

## 2.3.2    静电场的旋度和环路定理
真空中环路定理的微分形式：$$\boxed{\nabla \times \boldsymbol{E}=\boldsymbol{0}}$$
静电场是无旋场。

真空中环路定理的积分形式：$$\boxed{\oint_{C}\boldsymbol{E\cdot}\mathrm{d}l=0}$$
物理意义：将单位正电荷沿静电场中的任一个闭合路径移动一周，电场力不做功。

# 2.4    电位函数

## 2.4.1    电位
点电荷 $q$ 产生的电场的电位函数为$$\phi(\boldsymbol{r})=\frac{q}{4\pi\varepsilon_{0}|\boldsymbol{r}-\boldsymbol{r}'|}+C$$

# 2.5    介质中静电场的基本方程
物质由带正电荷和负电荷的粒子构成，物质的存在相当于在真空中添加大量的带电粒子。

在外电场的作用下，电荷重新分布，出现感应电荷，感应电荷也能产生电场。

## 2.5.1    介质的极化
无极分子的正、负电荷中心重合，有极分子的正、负电荷中心不重合，构成一个电偶极子（相距很近的带有等量异号电荷的系统）。

电介质的分子在外电场的作用下发生位移或偏转的现象，称为电解质的极化。

电偶极矩：$\boldsymbol{p}=q\boldsymbol{l}$。

### 1. 极化强度
极化强度矢量 $\boldsymbol{P}$：单位体积内电偶极矩的矢量和 $$\boldsymbol{P}=\lim_{ \Delta v \to 0 } \frac{\sum \boldsymbol{p}_{i}}{\Delta v}$$单位：$\mathrm{C /m^{2}}$

若 $\boldsymbol{p}_{0}$ 是平均电偶极矩，$N$ 为该介质的分子密度（单位体积内的分子数），则$$\boldsymbol{P}=N\boldsymbol{p}_{0}$$
若介质内各店处的 $\boldsymbol{P}$ 均相同，则此介质处于均匀极化状态。

### 2. 极化电荷（束缚电荷）
极化电荷体密度 $\rho_{\mathrm{p}}$ 与极化强度之间的关系：$$\rho_{\mathrm{p}}=-\nabla \boldsymbol{\cdot P}$$
极化电荷是极化强度矢量的通量源。

介质均匀极化时，$\boldsymbol{P}$ 为常矢，$\nabla \boldsymbol{\cdot P}=0$，极化电荷只出现在介质的分界面上，称为面极化电荷。

如图，$\boldsymbol{a}_{n}$ 为分界面上由介质 2 指向介质 1 的法向单位矢量。![图](/assets/images/electromagnetic-fields-and-waves/1743148826852.jpg)
分界面上的极化电荷面密度 $\rho_{\mathrm{sp}}$ 为：$$\rho_{\mathrm{sp}}=-\boldsymbol{n\cdot}(\boldsymbol{P}_{1}-\boldsymbol{P}_{2})$$若介质 1 为真空，$$\rho_{\mathrm{sp}}=\boldsymbol{n\cdot P}$$

## 2.5.2    电位移矢量和介质中静电场的基本方程
电位移矢量：$$\boldsymbol{D}=\varepsilon_{0}\boldsymbol{E}+\boldsymbol{P}$$单位：$\mathrm{C /m^{2}}$，又称为电通量密度。

介质中高斯定律的微分形式：$$\boxed{\nabla \boldsymbol{ \cdot D}=\rho}$$物理意义：$\boldsymbol{D}$ 的通量源是自由电荷，$\boldsymbol{D}$ 的场线的起点和终点都在自由电荷上，而 $\boldsymbol{E}$ 的场线的起点和终点既可以是自由电荷，也可以是极化电荷。

介质中高斯定律的积分形式：$$\boxed{\oint_{S}\boldsymbol{D\cdot}\mathrm{d}\boldsymbol{s}=q}$$
对线性均匀各向同性介质（LHI 电介质、A 类电介质）：$$\boldsymbol{P}=\varepsilon_{0}\chi_{\mathrm{e}}\boldsymbol{E}$$其中 $\chi_{\mathrm{e}}$ 称为介质的极化率，是一个无量纲的纯数。

> 线性：极化强度与电场强度成正比。
> 均匀：各部分性质相同。
> 各向同性：电特性与方向无关。

介质的本构关系：$$\boxed{\mathrm{D}=\varepsilon \boldsymbol{E}}$$式中 $\varepsilon_{\mathrm{r}}=1+\chi_{\mathrm{e}}$，$\varepsilon=\varepsilon_{\mathrm{r}}\varepsilon_{0}$，$\varepsilon$ 称为介质的介电常数，单位 $\mathrm{F /m}$。$\varepsilon_{\mathrm{r}}$ 为无量纲纯数，称为介质的相对介电常数，越大表示介质的绝缘程度越高。

# 2.7    静电场的边界条件
描述不同媒质分界面上场量满足的关系的方程，称为电磁场的边界条件，只能采用场的基本方程的积分形式导出，即$$\begin{cases}\oint_{C}\boldsymbol{E\cdot}\mathrm{d}\boldsymbol{l}=0\\\oint_{S}\boldsymbol{D\cdot}\mathrm{d}\boldsymbol{s}=q\end{cases}$$

## 2.7.1    电场强度矢量 $\boldsymbol{E}$ 的边界条件
$$\boxed{\boldsymbol{n}\times(\boldsymbol{E}_{1}-\boldsymbol{E}_{2})=\boldsymbol{0}\quad \text{或}\quad E_{1t}-E_{2t}=0}$$
电场强度 $\boldsymbol{E}$ 的切向分量是连续的。在静电场中，$\boldsymbol{E}$ 总是垂直于导体表面，导体表面是等电位面。

## 2.7.2    电位移矢量 $\boldsymbol{D}$ 的边界条件
$$\boxed{\boldsymbol{n\cdot}(\boldsymbol{D}_{1}-\boldsymbol{D}_{2})=\rho_{\mathrm{s}}\quad \text{或} \quad D_{1n}-D_{2n}=\rho_{\mathrm{s}}}$$
如果两种媒质的分界面上有一层自由电荷，则 $\boldsymbol{D}$ 的法向分量是不连续的。其突变量为该点的自由电荷面密度。

如果第二媒质是导体，第一媒质是电介质，则$$D_{n}=\rho_{\mathrm{s}}$$
如果分界面两侧都是电介质，且分界面上没有自由面电荷，则$$D_{1n}=D_{2n}$$

## 2.7.3    电位 $\phi$ 的边界条件
$$\begin{cases}\phi_{1}=\phi_{2}\quad \text{（仅在分界面上）}\\\varepsilon_{1} \frac{\partial \phi_{1}}{\partial n}-\varepsilon_{2} \frac{\partial \phi_{2}}{\partial n}=-\rho_{\mathrm{s}}\end{cases}$$

若分界面上不存在自由电荷，则$$\varepsilon_{1} \frac{\partial \phi_{1}}{\partial n}=\varepsilon_{2} \frac{\partial \phi_{2}}{\partial n}$$
若第二媒质是导体，静电场中的导体为等位体，$$\phi=常数$$
