---
layout: post
title: 第 1 章    矢量分析
category: 电磁场与电磁波
tags: [考前复习, 电磁场与电磁波]
excerpt: "电磁场与电磁波矢量分析基础公式整理。"
---

# 1.1    矢量及其运算

## 1.1.1    标量和矢量
一个仅用大小就能完整描述的物理量称为标量。
一个既有大小又有方向特性的物理量称为矢量。

## 1.1.2    矢量的表示方法
几何表示、代数表示
矢量 $\boldsymbol{A}$ 与坐标轴正向之间的夹角分别是 $\alpha,\beta,\gamma$，故有方向余弦
点 $P$ 的位置矢量（矢径）：$\boldsymbol{r}=\boldsymbol{a}_{x}x+\boldsymbol{a}_{y}y+\boldsymbol{a}_{z}z=\overrightarrow{OP}$

## 1.1.3    矢量的代数运算
1. 加法和减法
2. 标量乘以矢量
3. 点积或标量积
    计算：$$\boldsymbol{A\cdot B}=AB\cos \theta$$
    服从交换律和分配律
    $B\cos \theta$ 称为 $\boldsymbol{B}$ 沿 $\boldsymbol{A}$ 的分量，也常称为 $\boldsymbol{B}$ 在 $\boldsymbol{A}$ 上的标投影。$\boldsymbol{A}\cdot \boldsymbol{B}=A_{x}B_{x}+A_{y}B_{y}+A_{z}B_{z}$
4. 叉积或矢量积
    计算：$\boldsymbol{A}\times \boldsymbol{B}=\boldsymbol{a}_{n}AB\sin\theta$
    不服从交换律：$\boldsymbol{B}\times \boldsymbol{A}=-\boldsymbol{A}\times \boldsymbol{B}$
    满足分配律：$\boldsymbol{A}\times(\boldsymbol{B}+\boldsymbol{C})=\boldsymbol{A}\times \boldsymbol{B}+\boldsymbol{A}\times \boldsymbol{C}$
    在直角坐标系中：
    $\begin{align}\boldsymbol{A}\times \boldsymbol{B}&=\boldsymbol{a}_{x}(A_{y}B_{z}-A_{z}B_{y})+\boldsymbol{a}_{y}(A_{z}B_{x}-A_{x}B_{z})+\boldsymbol{a}_{z}(A_{x}B_{y}-A_{y}B_{x})\\&=\left |\begin{matrix}\boldsymbol{a}_{x} &\boldsymbol{a}_{y} &\boldsymbol{a}_{z}\\A_{x}&A_{y}&A_{z}\\B_{x}&B_{y}&B_{z}\end{matrix}\right |\end{align}$
5. 三重积
    (1) 标量三重积
        $$\boldsymbol{C}\cdot(\boldsymbol{A}\times \boldsymbol{B})=ABC\sin\theta \cos \varphi$$
        其中，$\theta$ 和 $\varphi$ 分别代表矢量 $\boldsymbol{A}$ 与 $\boldsymbol{B}$ 和矢量 $\boldsymbol{C}$ 与 $\boldsymbol{A}\times \boldsymbol{B}$ 的夹角。
    轮换性质：$\boldsymbol{A}\cdot(\boldsymbol{B}\times \boldsymbol{C})=\boldsymbol{B}\cdot(\boldsymbol{C}\times \boldsymbol{A})=\boldsymbol{C}\cdot(\boldsymbol{A}\times \boldsymbol{B})$
    (2) 矢量三重积
        是一个矢量。$$\boldsymbol{A}\times(\boldsymbol{B}\times \boldsymbol{C})$$
        不满足结合律，但满足如下性质：$\boldsymbol{A}\times(\boldsymbol{B}\times \boldsymbol{C})=(\boldsymbol{A\cdot C})\boldsymbol{B}-(\boldsymbol{A\cdot B})\boldsymbol{C}$

## 1.1.4    矢量函数及微分运算
略

# 1.2    正交坐标系

## 1.2.1    直角坐标系
坐标变量：$x,y,z$
坐标单位矢量：$\boldsymbol{a}_{x},\boldsymbol{a}_{y},\boldsymbol{a}_{z}$
位置矢量：$\boldsymbol{r}=\boldsymbol{a}_{x}x+\boldsymbol{a}_{y}y+\boldsymbol{a}_{z}z$
线元矢量：$\mathrm{d}\boldsymbol{l}=\boldsymbol{a}_{x}\mathrm{d}x+\boldsymbol{a}_{y}\mathrm{d}y+\boldsymbol{a}_{z}\mathrm{d}z$
面积元矢量：$\begin{cases}\mathrm{d}\boldsymbol{s}_{x}=\boldsymbol{a}_{x}\mathrm{d}y\mathrm{d}z\\\mathrm{d}\boldsymbol{s}_{y}=\boldsymbol{a}_{y}\mathrm{d}x\mathrm{d}z\\\mathrm{d}\boldsymbol{s}_{z}=\boldsymbol{a}_{z}\mathrm{d}x\mathrm{d}y\end{cases}$
体积元：$\mathrm{d}v=\mathrm{d}x\mathrm{d}y\mathrm{d}z$

## 1.2.2    圆柱坐标系
$\boldsymbol{a}_{\rho}\times \boldsymbol{a}_{\varphi}=\boldsymbol{a}_{z}$

## 1.2.3    球坐标系
$\boldsymbol{a}_{r}\times \boldsymbol{a}_{\theta}=\boldsymbol{a}_{\varphi}$
面积元矢量：$\begin{cases}\mathrm{d}\boldsymbol{s}_{r}=\boldsymbol{a}_{r}r^{2}\sin\theta \mathrm{d}\theta \mathrm{d}\varphi\\\mathrm{d}\boldsymbol{s}_{\theta}=\boldsymbol{a}_{\theta}r\sin\theta \mathrm{d}r \mathrm{d}\varphi\\\mathrm{d}\boldsymbol{s}_{\varphi}=\boldsymbol{a}_{\varphi}r \mathrm{d}r \mathrm{d}\theta\end{cases}$
体积元：$\mathrm{d}v=r^{2}\sin\theta \mathrm{d}r \mathrm{d}\theta \mathrm{d}\varphi$

# 1.3    标量场的梯度
如果每一时刻，一个物理量在空间中某个区域中的每一点都有确定值，则称此区域中确定该物理量的**场**。

场的分类
- 按物理量性质：
    - 标量场（梯度）
    - 矢量场（散度、旋度）
- 按时变性
    - 静态场 $u(x,y,z),\boldsymbol{F}(x,y,z)$
    - 时变场 $u(x,y,z,t),\boldsymbol{F}(x,y,z,t)$

## 1.3.1    等值面
等值面方程：$$u(x,y,z)=C$$
性质：
- 充满整个空间
- 过某点有唯一等值面
- 互不相交

## 1.3.2    方向导数
1. 方向导数的概念
    标量场 $u(M)$ 在点 $M_{0}$ 处沿方向 $\boldsymbol{l}$ 的方向导数为$$\left.\frac{\partial u}{\partial l}\right|_{M_{0}}=\lim_{\Delta l \to 0 } \frac{u(M)-u(M_{0})}{\Delta l} $$
    物理意义：标量场 $u(M)$ 在点 $M_{0}$ 处沿方向 $\boldsymbol{l}$ 的距离变化率。
    
    性质：
    - 若 $\left.\frac{\partial u}{\partial l}\right|_{M_{0}}>0$，说明函数 $u$ 在 $M_0$ 点沿 $\boldsymbol{l}$ 方向是增加的。
    - 若 $\left.\frac{\partial u}{\partial l}\right|_{M_{0}}<0$，说明函数 $u$ 在 $M_0$ 点沿 $\boldsymbol{l}$ 方向是减小的。
    - 若 $\left.\frac{\partial u}{\partial l}\right|_{M_{0}}=0$，说明函数 $u$ 在 $M_0$ 点沿 $\boldsymbol{l}$ 方向无变化。

2. 方向导数的计算公式：
    直角坐标系中：$$\frac{\partial u}{\partial l}=\frac{\partial u}{\partial x}\cos \alpha+\frac{\partial u}{\partial y}\cos\beta+\frac{\partial u}{\partial z}\cos\gamma$$

## 1.3.3    梯度
1. 梯度的概念
    标量场 $u$ 在点 $M$ 处的梯度是一个**矢量**，它的方向是场量 $u$ 变化率最大的方向，大小为其最大变化率，记作 $\mathrm{grad}\ u$，即$$\mathrm{grad}\ u=\boldsymbol{a}_{l}\left.\frac{\partial u}{\partial l}\right|_{\mathrm{max}}$$式中，$\boldsymbol{a}_{l}$ 是场量 $u$ 变化率最大方向的单位矢量。
2. 梯度的计算
    在直角坐标系中梯度的表达式为$$\mathrm{grad}\ u=\boldsymbol{a}_{x} \frac{\partial u}{\partial x}+\boldsymbol{a}_{y} \frac{\partial u}{\partial y}+\boldsymbol{a}_{z} \frac{\partial u}{\partial z}$$
    哈密顿算符（读作“del”或“nabla”）：$$\nabla =\boldsymbol{a}_{x} \frac{\partial}{\partial x}+\boldsymbol{a}_{y} \frac{\partial }{\partial y}+\boldsymbol{a}_{z} \frac{\partial }{\partial z}$$
3. 梯度的性质：
    - 梯度总是指向函数值增大的方向
    - 方向导数是函数的梯度在该方向上的投影
    - 梯度垂直于通过该点的等值面
4. 梯度运算的基本公式
    $$\nabla C=0\quad \text{（}C\ \text{为常数）}$$ $$\nabla (Cu)=C \nabla u\quad \text{（}C\ \text{为常数）}$$ $$\nabla (u \pm v)=\nabla u\pm \nabla v$$ $$\nabla (uv)=u\nabla v+v\nabla u$$ $$\nabla  \left( \frac{u}{v} \right)=\frac{1}{v^2}(v\nabla u-u\nabla v)$$ $$\nabla f(u)=f'(u)\nabla u$$
    结论：$$\nabla\left( \frac{1}{R} \right)＝-\nabla'\left( \frac{1}{R} \right)$$其中，$R$ 表示空间点 $(x,y,z)$ 和点 $(x',y',z')$ 之间的距离。符号 $\nabla'$ 表示对 $x',y',z'$ 微分。

# 1.4    矢量场的旋度

## 1.4.1    矢量线
矢量线是这样的族曲线，其上每一点的切线方向代表了该点矢量场的方向。
矢量线的疏密程度代表了矢量场的大小。

性质：
- 矢量场中的每一点均有唯一的一条矢量线通过。
- 矢量线充满了整个矢量场所在空间。

## 1.4.2    通量

### 1. 面元矢量
设 $S$ 为一空间曲面，$\mathrm{d}\boldsymbol{s}$ 为曲面 $S$ 上的面元，取一个与此面元相垂直的单位矢量 $\boldsymbol{n}$，则称矢量$$\mathrm{d}\boldsymbol{s}=\boldsymbol{n}\mathrm{d}s$$为面元矢量。大小：$\mathrm{d}s$，方向：$\boldsymbol{n}$。
方向的取法：
- 开曲面：右手螺旋法则
- 闭合曲面：外法线方向
物理意义：既表征了面积元的大小又表征了方向

### 2. 通量的概念
矢量场 $\boldsymbol{F}$ 在场中某个曲面 $S$ 上的面积分，称为该矢量场通过此曲面的通量，记作$$\psi=\int_{S}\boldsymbol{F}\cdot \mathrm{d}\boldsymbol{s}=\int_{S}\boldsymbol{F}\cdot \boldsymbol{n}\mathrm{d}s$$
如果 $S$ 是一闭合曲面，则通过闭合曲面的总通量表示为$$\psi=\oint_{S}\boldsymbol{F}\cdot \mathrm{d}\boldsymbol{s}=\oint_{S}\boldsymbol{F}\cdot \boldsymbol{n}\mathrm{d}s$$
对于空间任一闭合曲面 $S$，规定其上面积元 $\mathrm{d}s$ 的单位法线矢量 $\boldsymbol{n}$ 方向为由面内指向面外。

当 $\psi>0$ 时，在 $S$ 内必然有发出通量线的源，称为**正源**；当 $\psi<0$ 时，$S$ 内必然有吸收（中止）通量线的源，称为**负源**。统称有源场。

$\psi=0$ 时，$S$ 内没有源或者 $S$ 内的正源和负源完全相等并抵消，这种场称为无源场、无散场或管型场。

通量是可叠加的，即若$$\boldsymbol{F}=\sum_{i=1}^{n}\boldsymbol{F}_{i}$$则$$\psi=\sum_{i=1}^{n}\oint_{S}\boldsymbol{F}_{i}\cdot \mathrm{d}\boldsymbol{s}$$

## 1.4.3    散度

### 1. 散度的概念
设有矢量场 $\boldsymbol{F}$，在场中任意一点 $M$ 的某个邻域内作一包含 $M$ 点的任一闭合面 $S$，设 $S$ 所包围的体积为 $\Delta v$，当 $\Delta v$ 以任意方式趋于零（即缩至 $M$ 点）时，取下述极限$$\lim_{ \Delta v \to 0 } \frac{\oint_{S}\boldsymbol{F\cdot} \mathrm{d}\boldsymbol{s}}{\Delta v} =\lim_{ \Delta v \to 0 } \frac{\oint_{S}\boldsymbol{F\cdot n}\mathrm{d}s}{\Delta v}$$这个极限称为矢量场 $\boldsymbol{F}$ 在 $M$ 点的散度，记为 $\mathrm{div}\ \boldsymbol{F}$，即$$\mathrm{div}\ \boldsymbol{F}=\lim_{ \Delta v \to 0 } \frac{\oint_{S}\boldsymbol{F\cdot n}\mathrm{d}s}{\Delta v}$$

散度也可称为通量体密度。若 $\mathrm{div}\ \boldsymbol{F}>0$，则该点具有正通量源；若$\mathrm{div}\ \boldsymbol{F}<0$，则该点具有负通量源；若 $\mathrm{div}\ \boldsymbol{F}=0$，则该点无通量源。

若某一区域内所有的点上的矢量场的散度都等于零，则称该区域内的矢量场为无源场。

散度的物理意义如图：![图](/assets/images/electromagnetic-fields-and-waves/1742287819667.jpg)

### 2. 散度的计算

$$\mathrm{div}\ \boldsymbol{F}=\nabla \boldsymbol{\cdot F}$$

### 3. 散度的基本运算公式
$$\nabla \boldsymbol{\cdot C}=0\quad \text{（}\boldsymbol{C}\text{ 为常矢量）}$$ $$\nabla \boldsymbol{\cdot}(\boldsymbol{ C}f)=\boldsymbol{C\cdot}\nabla f\quad \text{（}\boldsymbol{C}\text{ 为常矢量）}$$ $$\nabla \boldsymbol{\cdot}(k\boldsymbol{F})=k\nabla \boldsymbol{\cdot F}\quad \text{（}k\text{ 为常数）}$$ $$\nabla \boldsymbol{\cdot}(f\boldsymbol{F})=f\nabla \boldsymbol{\cdot F}+\boldsymbol{F\cdot}\nabla f$$ $$\nabla \boldsymbol{\cdot}(\boldsymbol{F}\pm \boldsymbol{G})=\nabla \boldsymbol{\cdot F}\pm \nabla \boldsymbol{\cdot G}$$

## 1.4.4    高斯散度定理
高斯散度定理：$$\oint_{S}\boldsymbol{F\cdot}\mathrm{d}\boldsymbol{s}=\int_{V}\nabla \boldsymbol{\cdot F}\mathrm{d}v$$

# 1.5    矢量场的旋度

## 1.5.1    环量
矢量场 $\boldsymbol{F}$ 沿场中某一有向闭合曲线（路径）$C$ 的曲线积分$$\Gamma=\oint_{C}\boldsymbol{F\cdot}\mathrm{d}\boldsymbol{l}$$称为矢量场 $\boldsymbol{F}$ 沿闭合曲线的环量或环流。

如果矢量场的环度不为零，称该矢量场为有旋矢量场，能够激发有旋矢量场的源称为旋涡源。
如果矢量场沿任意闭合路径的环量恒为零，称该矢量场为无旋场，又称为保守场。

## 1.5.2    环量面密度
定义极限$$\mathrm{rot}_{n}\boldsymbol{F}=\lim_{ \Delta s \to 0 } \frac{\oint_{C}\boldsymbol{F\cdot}\mathrm{d}\boldsymbol{l}}{\Delta s}$$为矢量场在点 $M$ 处沿方向 $\boldsymbol{n}$ 的环量面密度。
$$\mathrm{rot}_{x}\boldsymbol{F}=\frac{\partial F_{z}}{\partial y}-\frac{\partial F_{y}}{\partial z}$$ $$\mathrm{rot}_{y}\boldsymbol{F}=\frac{\partial F_{x}}{\partial z}-\frac{\partial F_{z}}{\partial x}$$ $$\mathrm{rot}_{z}\boldsymbol{F}=\frac{\partial F_{y}}{\partial x}-\frac{\partial F_{x}}{\partial y}$$

## 1.5.3    旋度

### 1. 旋度的概念
矢量场 $\boldsymbol{F}$ 在点 $M$ 处的旋度为一矢量，记作 $\mathrm{rot}\ \boldsymbol{F}$ 或者 $\mathrm{curl}\ \boldsymbol{F}$，它的方向是使环量面密度取得最大值的面元法线方向，大小为该环量面密度最大值，即$$\mathrm{rot}\ \boldsymbol{F}=\boldsymbol{n}[\mathrm{rot}_{n}\boldsymbol{F}]_{\mathrm{max}}$$
一个矢量函数的旋度仍然是一个矢量函数。

物理意义：
若空间中某点 $\mathrm{rot}\ \boldsymbol{F}\neq 0$，则该点存在产生矢量场的旋涡源。
若空间中某点 $\mathrm{rot}\ \boldsymbol{F}= 0$，则该点不存在产生矢量场的旋涡源。

性质：矢量场沿任一方向的环量面密度等于旋度在该方向上的投影，即$$\mathrm{rot}_{n}\boldsymbol{F}=\boldsymbol{a}_{n}\boldsymbol{\cdot}\mathrm{rot}\ \boldsymbol{F}$$类比：梯度和方向导数的关系

### 2. 旋度的计算
在直角坐标系中，$$\begin{align}\mathrm{rot}\ \boldsymbol{F}&=\boldsymbol{a}_{x}\left(\frac{\partial F_{z}}{\partial y}-\frac{\partial F_{y}}{\partial z}\right )+\boldsymbol{a}_{y}\left(\frac{\partial F_{x}}{\partial z}-\frac{\partial F_{z}}{\partial x}\right )+\boldsymbol{a}_{z}\left(\frac{\partial F_{y}}{\partial x}-\frac{\partial F_{x}}{\partial y}\right )\\&=\left |\begin{matrix}\boldsymbol{a}_{x}&\boldsymbol{a}_{y}&\boldsymbol{a}_{z}\\\frac{\partial }{\partial x}&\frac{\partial }{\partial y}&\frac{\partial }{\partial z}\\F_{x}&F_{y}&F_{z}\end{matrix}\right |\\&=\nabla \times \boldsymbol{F}\end{align}$$

### 3. 旋度与散度的区别
- 散度是标量，旋度是矢量。
- 散度描述的是场分量沿各自方向上的变化规律，旋度描述场分量沿着与它垂直的方向上的变化规律。
- 散度描述矢量场与通量源之间的关系，旋度描述矢量场与旋涡源之间的关系。

### 4. 旋度的有关公式
$$\nabla \times \boldsymbol{C}=\boldsymbol{0}\quad \text{（}\boldsymbol{C}\ \text{为常矢量）}$$ $$\nabla \times(k\boldsymbol{F})=k\nabla \times \boldsymbol{F}\quad\text{（}k\ \text{为常数）}$$ $$\nabla \times(f\boldsymbol{C})=\nabla f\times \boldsymbol{C} \quad \text{（}\boldsymbol{C}\ \text{为常矢量）}$$ $$\nabla \times(f\boldsymbol{F})=f\nabla \times \boldsymbol{F}+\nabla f\times \boldsymbol{F}\quad \text{（}f\ \text{为标量函数）}$$ $$\nabla \times(\boldsymbol{F}\pm \boldsymbol{G})=\nabla \times \boldsymbol{F}\pm \nabla \times \boldsymbol{G}$$ $$\nabla \boldsymbol{\cdot}(\boldsymbol{F}\times \boldsymbol{G})=\boldsymbol{G\cdot}(\nabla \times \boldsymbol{F})-\boldsymbol{F\cdot}(\nabla \times \boldsymbol{G})$$

## 1.5.4    斯托克斯定理
矢量场 $\boldsymbol{F}$ 沿任意闭合曲线的线积分等于该矢量场的旋度在该闭合曲线所围曲面上的面积分：$$\boxed{\oint_{C}\boldsymbol{F\cdot}\mathrm{d}\boldsymbol{l}=\int_{S}\nabla \times \boldsymbol{F\cdot}\mathrm{d}\boldsymbol{s}}$$

# 1.6    场函数的二阶微分运算

## 1.6.1    零恒等式

### 1. $\nabla \times(\nabla u)\equiv 0$
标量场的梯度的旋度恒等于零。

该结论的逆定理也成立：若已知一矢量场的旋度为零，则该矢量场可以表示为一个标量场的梯度。设有一矢量函数 $\boldsymbol{F}$ 的旋度恒为零，即 $\nabla \times \boldsymbol{F}\equiv 0$，则存在一个标量函数 $\phi$，使得 $\boldsymbol{F}=-\nabla \phi$。

旋度为零的矢量场称为保守场，故任何标量场的梯度构成的矢量场都是保守场，反之，保守场均可以表示成一个标量场的梯度。

### 2. $\nabla \boldsymbol{\cdot}(\nabla \times \boldsymbol{F})\equiv 0$
矢量场的旋度的散度恒等于零。

该结论的逆定理也成立：若已知一矢量场的散度为零，则该矢量场可以表示为另一个矢量场的旋度。

## 1.6.2    拉普拉斯运算

### 1. $\nabla^{2}u=\nabla \boldsymbol{\cdot}(\nabla u)$

此式为**标性拉普拉斯运算**。$\nabla^{2}$ 表示标量函数的梯度的散度，称为**拉普拉斯算子**。$\nabla^{2}u$ 读作拉普拉辛 $u$。

在直角坐标系下的表达式为$$\nabla^{2}u=\left( \frac{\partial^{2}}{\partial x^{2}}+\frac{\partial^{2}}{\partial y^{2}}+\frac{\partial^{2}}{\partial z^{2}} \right)u$$

### 2. $\nabla^{2}\boldsymbol{F}=\nabla(\nabla \boldsymbol{\cdot F})-\nabla \times(\nabla \times \boldsymbol{F})$
此式为**矢性拉普拉斯运算**，在直角坐标系中的表达式为$$\nabla^{2}\boldsymbol{F}=\boldsymbol{a}_{x}\nabla^{2}F_{x}+\boldsymbol{a}_{y}\nabla^{2}F_{y}+\boldsymbol{a}_{z}\nabla^{2}F_{z}$$

# 1.7    亥姆霍兹定理
在空间的有限区域 $V$ 内的任意一个矢量场 $\boldsymbol{F}$，若已知它的散度、旋度和边界条件（即限定体积 $V$ 的闭合面 $S$ 上的矢量的分布）则该矢量场就被唯一地确定，并可表示成一个无旋场 $\boldsymbol{F}_{1}=-\nabla \phi$ 和一个无源场 $\boldsymbol{F}_{2}=\nabla \times \boldsymbol{A}$ 之和，即$$\boldsymbol{F}=\boldsymbol{F}_{1}+\boldsymbol{F}_{2}=-\nabla \phi+\nabla \times \boldsymbol{A}$$
矢量场基本方程微分形式：$$\nabla \boldsymbol{\cdot F}=\nabla \boldsymbol{\cdot}(\boldsymbol{F}_{1}+\boldsymbol{F}_{2})=\nabla \boldsymbol{\cdot F}_{1}=\rho\quad \text{通量源}$$ $$\nabla \times \boldsymbol{F}=\nabla \times(\boldsymbol{F}_{1}+\boldsymbol{F}_{2})=\nabla \times \boldsymbol{F}_{2}=\boldsymbol{J}\quad \text{旋涡源}$$

> 若位置矢量 $\boldsymbol{r}=\boldsymbol{a}_{x}x+\boldsymbol{a}_{y}y+\boldsymbol{a}_{z}z$，$r=\sqrt{ x^{2}+y^{2}+z^{2} }$，则 $$\nabla r=\frac{\boldsymbol{r}}{r}=\boldsymbol{a}_{r}$$ $$\nabla \frac{1}{r}=-\frac{\boldsymbol{r}}{r^{3}}$$ $$\nabla \boldsymbol{\cdot r}=3$$ $$\nabla \times \boldsymbol{r}=\boldsymbol{0}$$ $$\nabla \boldsymbol{\cdot}\nabla r=\frac{2}{r}$$ $$\nabla \boldsymbol{\cdot}\nabla \frac{1}{r}=-4\pi\delta(r)$$
