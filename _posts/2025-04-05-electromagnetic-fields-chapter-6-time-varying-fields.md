---
layout: post
title: 第 6 章    时变电磁场
category: 电磁场与电磁波
tags: [考前复习, 电磁场与电磁波]
excerpt: "电磁场与电磁波时变电磁场章节公式整理。"
---

# 6.1    法拉第电磁感应定律
当通过任意导体回路的磁通量 $\Phi$ 随时间发生变化时，回路中产生感应电动势的大小等于磁通量 $\Phi$ 随时间的变化率。$$\mathscr{E}_{\mathrm{c}}= - \frac{\mathrm{d}\Phi}{\mathrm{d}t}$$式中，$\boldsymbol{E}$ 是感应电场的强度。负号是楞次定律的体现。

电磁感应定律的积分形式：$$\oint_{C} \boldsymbol{E\cdot}\mathrm{d}\boldsymbol{l}=- \frac{\mathrm{d}}{\mathrm{d}t}\int_{S} \boldsymbol{B\cdot}\mathrm{d}\boldsymbol{s}$$对于只有磁场变化而回路静止的情形，$$\oint_{C} \boldsymbol{E\cdot}\mathrm{d}\boldsymbol{l}=-\int_{S} \frac{\partial \boldsymbol{B}}{\partial t} \boldsymbol{ \cdot}\mathrm{d}\boldsymbol{s}$$
电磁感应定律的微分形式：$$\nabla \times \boldsymbol{E}=- \frac{\partial \boldsymbol{B}}{\partial t}$$物理意义：当空间某点上的磁场随时间发生变化时，在该点就会产生感应电场，时变磁场在其周围激发涡旋电场。

# 6.2    位移电流
时变电磁场的电流连续性方程：$$\nabla \boldsymbol{\cdot}\left( \boldsymbol{J}+ \frac{\partial \boldsymbol{D}}{\partial t} \right)=0$$物理意义：时变场中只有传导电流和位移电流之和才是连续的。

修正的安培环路定律：$$\nabla \times \boldsymbol{H}=\boldsymbol{J}+ \frac{\partial \boldsymbol{D}}{\partial t}$$物理意义：时变场中，传导电流和位移电流均为磁场的旋涡源。

位移电流密度矢量$$\boldsymbol{J}_{\mathrm{d}}= \frac{\partial \boldsymbol{D}}{\partial t}$$单位：$\mathrm{A /m}$。

时变电场产生涡旋磁场。

# 6.4    麦克斯韦方程组
麦克斯韦方程组的微分形式为$$\nabla \times \boldsymbol{E}=- \frac{\partial \boldsymbol{B}}{\partial t}$$ $$\nabla \times \boldsymbol{H}=\boldsymbol{J}+ \frac{\partial \boldsymbol{D}}{\partial t}$$ $$\nabla \boldsymbol{\cdot B}=0$$ $$\nabla \boldsymbol{\cdot D}=\rho$$积分形式为$$\oint_{C}\boldsymbol{E\cdot}\mathrm{d}\boldsymbol{l}=-\int_{S} \frac{\partial \boldsymbol{B}}{\partial t}\boldsymbol{\cdot}\mathrm{d}\boldsymbol{s}$$ $$\oint_{C}\boldsymbol{H\cdot}\mathrm{d}\boldsymbol{l}=\int_{S}\boldsymbol{J\cdot}\mathrm{d}\boldsymbol{s}+\int_{S} \frac{\partial \boldsymbol{D}}{\partial t}\boldsymbol{\cdot}\mathrm{d}\boldsymbol{s}$$ $$\oint_{S}\boldsymbol{B\cdot}\mathrm{d}\boldsymbol{s}=0$$ $$\oint_{S}\boldsymbol{D\cdot}\mathrm{d}\boldsymbol{s}=\int_{V}\rho \mathrm{d}v$$
电场和磁场互为激发源。

限定形式的麦克斯韦方程的微分形式：$$\nabla \times \boldsymbol{E}=- \mu\frac{\partial \boldsymbol{H}}{\partial t}$$ $$\nabla \times \boldsymbol{H}=\sigma\boldsymbol{E}+ \varepsilon\frac{\partial \boldsymbol{E}}{\partial t}$$ $$\nabla \boldsymbol{\cdot H}=0$$ $$\nabla \boldsymbol{\cdot E}=\frac{\rho}{\varepsilon}$$

# 6.5    时变电磁场的边界条件

## 6.5.1    $\boldsymbol{D}$ 和 $\boldsymbol{B}$ 的法向分量方程
$$\boldsymbol{n\cdot}(\boldsymbol{D}_{1}-\boldsymbol{D}_{2})=\rho_{\mathrm{s}}$$ $$\boldsymbol{n\cdot}(\boldsymbol{B}_{1}-\boldsymbol{B}_{2})=0$$

## 6.5.2    $\boldsymbol{E}$ 和 $\boldsymbol{H}$ 的切向分量方程
$$\boldsymbol{n}\times(\boldsymbol{H}_{1}-\boldsymbol{H}_{2})=\boldsymbol{J}_{\mathrm{s}}$$ $$\boldsymbol{n}\times(\boldsymbol{E}_{1}-\boldsymbol{E}_{2})=0$$

## 6.5.3    特殊情况下的边界条件

### 1. 理想介质与理想介质分界面
对理想介质，$\boldsymbol{J}_{\mathrm{s}}=\boldsymbol{0}$，$\rho_{\mathrm{s}}=0$，故边界条件可简化为$$\boldsymbol{n}\times(\boldsymbol{E}_{1}-\boldsymbol{E}_{2})=\boldsymbol{0}$$ $$\boldsymbol{n}\times(\boldsymbol{H}_{1}-\boldsymbol{H}_{2})=\boldsymbol{0}$$ $$\boldsymbol{n\cdot}(\boldsymbol{D}_{1}-\boldsymbol{D}_{2})=0$$ $$\boldsymbol{n\cdot}(\boldsymbol{B}_{1}-\boldsymbol{B}_{2})=0$$

### 2. 理想介质与理想导体分界面
理想导体内部电场强度 $\boldsymbol{E}$ 处处为零，若不考虑恒定磁场，则磁感应强度 $\boldsymbol{B}$ 也处处为零。设媒质 1 为理想介质，媒质 2 为理想导体，则 $\boldsymbol{E}_{2}=\boldsymbol{0}$，$\boldsymbol{D}_{2}=\boldsymbol{0}$，$\boldsymbol{H}_{2}=\boldsymbol{0}$，$\boldsymbol{B}_{2}=\boldsymbol{0}$，边界条件简化为$$\boldsymbol{n}\times \boldsymbol{E}_{1}=\boldsymbol{0}$$ $$\boldsymbol{n}\times \boldsymbol{H}_{1}=\boldsymbol{J}_{\mathrm{s}}$$ $$\boldsymbol{n\cdot} \boldsymbol{D}_{1}=\rho_{\mathrm{s}}$$ $$\boldsymbol{n\cdot} \boldsymbol{B}_{1}=0$$

# 6.6    波动方程
标准形式的波动方程（非导电媒质，无源区）：$$\nabla^{2}\boldsymbol{E}-\mu\varepsilon \frac{\partial^{2}\boldsymbol{E}}{\partial t^{2}}=0$$ $$\nabla^{2}\boldsymbol{H}-\mu\varepsilon \frac{\partial^{2}\boldsymbol{H}}{\partial t^{2}}=0$$

# 6.7    坡印廷定理
坡印廷定理的微分形式：$$\nabla \boldsymbol{\cdot}(\boldsymbol{E}\times \boldsymbol{H})=- \frac{\partial}{\partial t}\left(\frac{1}{2}\boldsymbol{B\cdot H}+ \frac{1}{2}\boldsymbol{E\cdot D}\right)-\sigma E^{2}-\boldsymbol{E\cdot J}'$$（最后一项 $-\boldsymbol{E\cdot J}'$ 是有源项，若不包含可忽略）

坡印廷定理的积分形式：$$-\oint_{S}(\boldsymbol{E}\times \boldsymbol{H})\boldsymbol{\cdot}\mathrm{d}\boldsymbol{s}=\frac{\partial}{\partial t}\int_{V}\left( \frac{1}{2}\boldsymbol{B\cdot H}+\frac{1}{2} \boldsymbol{E\cdot D} \right)\mathrm{d}v+\int_{V}(\sigma E^{2}+\boldsymbol{E\cdot J}')\mathrm{d}v$$其中等号右边第一项是单位时间内 $V$ 内能量增量，第二项是 $V$ 内焦耳损耗。最后一项 $\boldsymbol{E\cdot J}'$ 是有源项，若不包含可忽略。

$\boldsymbol{E}\times \boldsymbol{H}$ 为坡印廷矢量（能流密度矢量、功率流密度矢量），即单位时间内穿过与能量流动方向垂直的单位面积的电磁能量，记为 $\boldsymbol{S}$，单位为 $\mathrm{W /m^{2}}$。$$\boldsymbol{S}=\boldsymbol{E}\times \boldsymbol{H}$$

# 6.8    时谐场方程的复数形式
时谐场：在稳定状态下，各场量均随时间作时谐变化的电磁场。

## 6.8.1    相量
时域函数 $A_{\mathrm{m}}\cos(\omega t+\varphi_{0})$ 的相量表示（复振幅）：$$\dot{A}=A_{\mathrm{m}}\mathrm{e}^{\mathrm{j}\varphi_{0}}$$
瞬时矢量与复矢量之间的关系：$$\boldsymbol{E}(\boldsymbol{r},t)=\mathrm{Re}[\dot{\boldsymbol{E}}_{\mathrm{m}}(\boldsymbol{r})\mathrm{e}^{\mathrm{j}\omega t}]$$

## 6.8.2    复数矢量
电场的复数矢量（复矢量）：$$\begin{align}\dot{\boldsymbol{E}}(x,y,z)&=\boldsymbol{a}_{x}\dot{E}_{x}(x,y,z)+\boldsymbol{a}_{y}\dot{E}_{y}(x,y,z)+\boldsymbol{a}_{z}\dot{E}_{z}(x,y,z)\\&=\boldsymbol{a}_{x}E_{xm}(x,y,z)\mathrm{e}^{\mathrm{j}\varphi_{x0}(x,y,z)}+\boldsymbol{a}_{y}E_{ym}(x,y,z)\mathrm{e}^{\mathrm{j}\varphi_{y0}(x,y,z)}+\boldsymbol{a}_{z}E_{zm}(x,y,z)\mathrm{e}^{\mathrm{j}\varphi_{z0}(x,y,z)}\end{align}$$
复矢量的微分为$$\frac{\mathrm{d}}{\mathrm{d}t}\boldsymbol{E}(x,y,z,t)=\mathrm{Re}[\mathrm{j}\omega\dot{\boldsymbol{E}}(x,y,z)\mathrm{e}^{\mathrm{j\omega t}}]$$
复矢量的积分为$$\int \boldsymbol{E}(x,y,z,t)\mathrm{d}t=\mathrm{Re}\left[  \frac{1}{\mathrm{j}\omega} \dot{\boldsymbol{E}}(x,y,z)\mathrm{e}^{\mathrm{j}\omega t}\right]$$

## 6.8.3    麦克斯韦方程组的复数形式
省略代表复数的点，则有麦克斯韦方程组的复数形式 $$\nabla \times \boldsymbol{E}=-\mathrm{j}\omega \boldsymbol{B}$$ $$\nabla \times \boldsymbol{H}=\boldsymbol{J}+\mathrm{j}\omega \boldsymbol{D}$$ $$\nabla \boldsymbol{\cdot B}=0$$ $$\nabla \boldsymbol{\cdot D}=\rho$$
L、H、I 媒质中本构关系不变。

## 6.8.4    媒质的类型
媒质的色散：媒质的电磁参数随频率的变化而变化的现象。
静态场：$\varepsilon$、$\mu$、$\sigma$ 为常数。
时谐场：$$\varepsilon=\widetilde{\varepsilon}(\omega)=\varepsilon'(\omega)-\mathrm{j}\varepsilon''(\omega)$$式中 $\varepsilon'(\omega)$ 代表极化，$\varepsilon''(\omega)$ 代表电滞损耗。影响大。
$$\mu=\widetilde{\mu}(\omega)=\mu'(\omega)-\mathrm{j}\mu''(\omega)$$式中 $\mu'(\omega)$ 代表磁化，$\mu''(\omega)$ 代表磁滞损耗。可忽略。

由 $\boldsymbol{J}=\sigma \boldsymbol{E}$、$\boldsymbol{D}=\widetilde{\varepsilon}\boldsymbol{E}$，得$$\begin{align}\nabla \times \boldsymbol{H}&=\boldsymbol{J}+\mathrm{j}\omega \boldsymbol{D}\\&=\sigma \boldsymbol{E}+\mathrm{j}\omega(\varepsilon'-\mathrm{j}\varepsilon'')\boldsymbol{E}\\&=\mathrm{j}\omega\varepsilon_{\mathrm{f}}\boldsymbol{E}\\&=\sigma \boldsymbol{E}+\omega\varepsilon''\boldsymbol{E}+\mathrm{j}\omega\varepsilon'\boldsymbol{E}\end{align}$$其中 $\varepsilon_{\mathrm{f}}=\varepsilon'-\mathrm{j}  \frac{\sigma+\omega\varepsilon''}{\omega}$ 称为等效复介电常数，上式第一项为传导电流，第二项为电滞损耗电流，这两项均属于有功电流。第三项为位移电流，属于无功电流。

电介质的损耗：
有功电流与无功电流之比（有耗媒质介电常数的虚部与实部的比值）：$$\tan\delta_{\mathrm{e}}=\frac{\sigma+\omega\varepsilon''}{\omega\varepsilon'}$$称为电介质的损耗角正切，称 $\delta_{\mathrm{e}}$ 为电介质的损耗角。

传导电流与位移电流之比：$$\left| \frac{\sigma \boldsymbol{E}}{\mathrm{j}\omega\varepsilon'\boldsymbol{E}} \right|= \frac{\sigma}{\omega\varepsilon'}$$

媒质的分类：
- 若 $\frac{\sigma}{\omega\varepsilon'}\gg 1$，则媒质为良导体。当 $\varepsilon''\approx 0$，$\sigma \to \infty$ 时，媒质为理想导体。
- 若 $\frac{\sigma}{\omega\varepsilon'}\approx 1$，则媒质为半电介质（半导体），或有耗电介质。
- 若 $\frac{\sigma}{\omega\varepsilon'}\ll 1$，则媒质为电介质。当 $\sigma=0$，$\varepsilon''=0$ 时为理想介质；当 $\sigma=0$，$\varepsilon''\ll \varepsilon'$ 时为良介质；当 $\varepsilon''$ 与 $\varepsilon'$ 可比拟时为不良介质。
在实际应用中，当 $\frac{\sigma}{\omega\varepsilon'}\leq 0.01$ 时为电介质，$0.01 <\frac{\sigma}{\omega\varepsilon'}< 100$ 时为半导体，$\frac{\sigma}{\omega\varepsilon'}\geq 100$ 时为良导体。

## 6.8.5    波动方程的复数形式
无源区无耗媒质齐次亥姆霍兹方程：$$\nabla^{2}\boldsymbol{E}+k^{2}\boldsymbol{E}=\boldsymbol{0}$$ $$\nabla^{2}\boldsymbol{H}+k^{2}\boldsymbol{H}=\boldsymbol{0}$$式中 $k=\omega \sqrt{ \mu\varepsilon }$。
以上方程的解 + $\begin{cases}\nabla \boldsymbol{\cdot H}=0\\\nabla \boldsymbol{\cdot E} = 0\end{cases}$ = 麦克斯韦方程的解。

有损耗时，$$\nabla^{2}\boldsymbol{E}+k_{\mathrm{f}}^{2}\boldsymbol{E}=\boldsymbol{0}$$ $$\nabla^{2}\boldsymbol{H}+k_{\mathrm{f}}^{2}\boldsymbol{H}=\boldsymbol{0}$$式中 $k_{\mathrm{f}}=\omega \sqrt{ \mu\varepsilon_{\mathrm{f}} }$。

无论有无损耗，L、H、I 媒质中的时谐场均满足齐次亥姆霍兹方程。

## 6.8.6    坡印廷定理的复数形式
平均坡印廷矢量：$$\boldsymbol{S}_{\mathrm{av}}(\boldsymbol{r})=\frac{1}{2}\mathrm{Re}(\boldsymbol{E}\times \boldsymbol{H}^{*})$$式中 $\boldsymbol{H}^{*}$ 为 $\boldsymbol{H}$ 的共轭复数。上式仅适用于时谐场。
