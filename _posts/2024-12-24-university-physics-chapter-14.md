---
layout: post
title: 第 14 章    量子物理
category: 大学物理
tags: [考前复习, 大学物理]
excerpt: "大学物理量子物理章节公式整理与复习。"
---

# 14.1 黑体辐射和普朗克量子假设
## 14.1.1    黑体辐射
**单色辐射出射度**（简称**单色辐出度**，monochromatic radiant exitance）：温度为 $T$ 的物体从单位面积上发射的波长介于 $\lambda$ 和 $\lambda+\mathrm{d}\lambda$ 之间的辐射功率 $\mathrm{d}E(T)$ 与 $\mathrm{d}\lambda$ 之比 $e(\lambda,T)=\frac{\mathrm{d}E(T)}{\mathrm{d}\lambda}$。

**辐射出射度**（简称**辐出度**，radiant exitance）：物体从单位面积上发射的所有各种波长的辐射总功率 $E(T)=\int_0^{\infty}e(\lambda,T)\mathrm{d}\lambda$。

单色吸收率（monochromatic absorptance）：当辐射从外界入射到温度为 $T$ 的物体表面时，在 $\lambda$ 到 $\lambda+\mathrm{d}\lambda$ 的波段内，吸收能量与入射总能量之比 $a(\lambda ,T)$。

基尔霍夫定律（Kirchhoff law of radiation）：在同样的温度下，不同的物体或不同表面性质的物体，其单色辐出度与单色吸收率之比是一恒量 $\frac{e_1(\lambda,T)}{a_1(\lambda,T)}=\frac{e_2(\lambda,T)}{a_2(\lambda,T)}=\cdots =e_0(\lambda,T)$。故一个好的吸收体一定也是一个好的发射体。

**斯特藩—玻尔兹曼定律**（Stefan-Boltzmann law）：物体的辐出度与温度的四次方成正比。$$E_0(T)=\sigma_0T^4\text{，}$$其中，$\sigma_0=5.67\times 10^{-8}\ \mathrm{W}\cdot \mathrm{m}^{-2}\cdot \mathrm{K}^{-4}$，称斯特藩常量（Stefan constant），$T$ 为绝对温度。

**维恩位移定律**（Wien displacement law）：能谱分布曲线的峰值对应的波长 $\lambda_m$ 与温度 $T$ 的乘积为一常量。$$\lambda_mT=b\text{，}$$其中，$b=2.898\times 10^{-3}\ \mathrm{m}\cdot\mathrm{K}$，称为维恩常量。
## 14.1.2    普朗克量子假设和普朗克公式
**普朗克公式**（Planck formula）：$$e_0(\lambda,T)=\frac{2\pi hc^2\lambda^{-5}}{\mathrm{e}^{\frac{hc}{\lambda kT}}-1}\text{，}$$其中 $h=6.626\times 10^{-34}\ \mathrm{J}\cdot \mathrm{s}$，称为**普朗克常量**（Planck constant）。

普朗克量子假设：对于频率为 $\nu$ 的振子，振子辐射的能量是不连续的，而是分立的，其取值是最小能量 $h\nu$ 的整数倍，即 $\varepsilon_n=nh\nu$（$n$ 是正整数）。
# 14.2    光电效应和爱因斯坦光子理论
## 14.2.1    光电效应
在入射光频率 $\nu$ 一定时，饱和电流 $i$ 与光强 $I$ 成正比。

反向截止电压反映光电子的初动能：$eU_a=\frac{1}{2}mv_{\mathrm{m}}^2$。
## 14.2.2    爱因斯坦光子理论
**光子**（photon）的能量大小为 $\varepsilon =h\nu$。

**爱因斯坦光电效应方程**（photoelectric equation）：$$h\nu =A+\frac{1}{2}mv_{\mathrm{m}}^2=A+eU_a\text{，}$$其中 $A$ 为**逸出功**（work function）。
$$I=Nh\nu$$ $$\nu_0=\frac{A}{h}$$ $$\frac{1}{2}mv_{\mathrm{m}}^2=h\nu-h\nu_0$$
## 14.2.3    光的波粒二象性
光子的动量 $p$ 为$$p=\frac{h\nu }{c}=\frac{h}{\lambda}\text{。}$$
# 14.4    氢原子光谱和玻尔理论
## 14.4.2    氢原子光谱
定义波数为 $\widetilde{\nu}=\frac{1}{\lambda}$，则$$\widetilde{\nu}=\frac{1}{\lambda}=R_{\mathrm{H}}\left (\frac{1}{m^2}-\frac{1}{n^2}\right )=T(m)-T(n)\quad (n\gt m)\text{，}$$其中，$R_{\mathrm{H}}=1.096\ 775\ 8\times 10^{7}\ \mathrm{m}^{-1}$ 称为氢原子的里德伯常量，$T(m)$ 和 $T(n)$ 称为光谱项。
## 14.4.3    玻尔氢原子理论
1. 定态假设：电子在原子中沿一组特殊轨道运动，并处于稳定的能量状态，称为定态（stationary state）。
2. 跃迁假设（频率定则）：当电子从一个能态轨道向另一个能态轨道跃迁（transition）时，要发射或吸收光子。光子的频率满足$$h\nu=E_n-E_m\text{。}$$
3. 轨道角动量量子化假设：电子在原子中的稳定轨道满足角动量 $L$ 等于 $\frac{h}{2\pi}$ 的整数倍条件。$$L=mvr=n\frac{h}{2\pi}=n\hbar,\quad n=1\text{，}2\text{，}3\text{，}\cdots$$其中 $\hbar=\frac{h}{2\pi}$ 称为折合普朗克常量。

轨道能量：$$E_n=-\frac{me^4}{8\varepsilon_0^2h^2n^2}=\frac{E_1}{n^2}\text{。}$$氢原子的基态能量：$E_1=-\frac{me^4}{8\varepsilon_0^2h^2}\approx -13.6\ \mathrm{eV}$。

轨道半径：$$r_n=\frac{\varepsilon_0h^2n^2}{\pi me^2}=n^2r_1\quad \text{（}n=1\text{，}2\text{，}3\text{，}\cdots\text{）。}$$
**玻尔半径**（Bohr radius）：$r_1=\frac{\varepsilon_0 h^2}{\pi me^2}=5.292\times 10^{-11}\ \mathrm{m}$。
# 14.5    德布罗意假设与电子衍射实验
## 14.5.1    德布罗意假设
德布罗意公式：$$E=h\nu\text{，}$$ $$p=\frac{h}{\lambda}\text{。}$$
德布罗意波长公式：$$\lambda=\frac{h}{\sqrt{\left (\frac{E_{\mathrm{k}}}{c}\right )^2+2m_0E_{\mathrm{k}}}}\text{，}$$当动能远小于静止能量时（或者说粒子的运动速度远小于光速时），德布罗意波长可近似为$$\lambda=\frac{h}{\sqrt{2m_0E_{\mathrm{k}}}}\text{。}$$
# 14.6    波函数的统计解释
## 14.6.2    波函数的统计解释
单色平面简谐波波动方程为：$\Psi=A\cos 2\pi\left (\nu t-\frac{x}{\lambda}\right )$。
用复指数形式表示：$\Psi=A\mathrm{e}^{-\mathrm{i}2\pi\left (\nu t-\frac{x}{\lambda}\right )}$。

推广：
三维自由粒子波函数：$$\Psi(\boldsymbol{r},t)=\Psi_0\mathrm{e}^{\frac{\mathrm{i}}{\hbar}(\boldsymbol{p}\cdot \boldsymbol{r}-Et)}\text{。}$$（能量为 $E$，动量为 $\boldsymbol{p}$ 的自由粒子波函数）

波函数的强度：$|\Psi|^2=\Psi \cdot \Psi^*$。

波函数在某一点的强度 $|\Psi|^2$ 与该点找到电子的概率成正比。

时刻 $t$ 粒子出现在 $\boldsymbol{r}$ 附近 $\mathrm{d}V$ 体积内的概率为：$|\Psi(\boldsymbol{r},t)|^2\mathrm{d}V$。

波函数的标准条件：单值、有限、连续。

归一化条件（normalizing condition）：$\int_V |\Psi|^2\mathrm{d}V=1$。

态叠加原理（principle of superposition of states）：$\Psi=a_1\Psi_1+a_2\Psi_2+\cdots+a_n\Psi_n$。
# 14.7    不确定关系
**海森伯不确定关系**（uncertainty relation）：$$\Delta x\cdot \Delta p_x\geq\frac{\hbar}{2}\text{，}$$ $$\Delta E \cdot \Delta t\geq\frac{\hbar}{2}\text{。}$$
# 14.8    薛定谔方程
## 14.8.1    薛定谔方程的引入
一维的薛定谔方程：$$\mathrm{i}\hbar\frac{\partial}{\partial t}\Psi(x,t)=\left [-\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2}+V(x,t)\right ]\Psi(x,t)。$$将上式推广到三维情况，则得$$\mathrm{i}\hbar\frac{\partial}{\partial t}\Psi(\boldsymbol{r},t)=\left [-\frac{\hbar^2}{2m}\nabla^2+V(\boldsymbol{r},t)\right ]\Psi(\boldsymbol{r},t)。$$
能量算符：$\mathrm{i}\hbar\frac{\partial}{\partial t}\to \hat{E}$，动量算符：$-\mathrm{i}\hbar\nabla\to\hat{\boldsymbol{p}}$。

> 在直角坐标系中，梯度算符$$\nabla=\frac{\partial}{\partial x}\boldsymbol{i}+\frac{\partial}{\partial y}\boldsymbol{j}+\frac{\partial}{\partial z}\boldsymbol{k}\text{；}$$拉普拉斯算符$$\nabla^2=\nabla \cdot \nabla=\frac{\partial^2}{\partial x^2}+\frac{\partial^2}{\partial y^2}+\frac{\partial^2}{\partial z^2}。$$


## 14.8.2    定态薛定谔方程
能量不随时间的变化而变化的状态称为定态（stationary state）。
定态薛定谔方程（stationary Schrödinger equation）：$$\left [-\frac{\hbar^2}{2m}\nabla^2+V(\boldsymbol{r})\right ]\psi(\boldsymbol{r})=E\psi(\boldsymbol{r})，$$ 
$\psi(\boldsymbol{r})$ 也称为**定态波函数**（stationary wave function）。要 $\psi(\boldsymbol{r})$ 满足波函数的条件，$E$ 就不能任意取值，而只能取某些值。我们把这些可以取的 $E$ 值称为体系的**能量本征值**（energy eigenvalue），而相应于每个 $E$ 值的解 $\psi(\boldsymbol{r})$ 也称为能量的**本征函数**（eigenfunction）。
# 14.9    一维定态
## 14.9.1    一维无限深方势阱
能量本征值：$$E_n=\frac{h^2}{8ma^2}n^2\text{，}\quad n=1\text{，}2\text{，}3\text{，}\cdots$$本征函数系：$$\psi_n(x)=\sqrt{\frac{2}{a}}\sin \frac{n\pi}{a}x\text{，}\quad n=1\text{，}2\text{，}3\text{，}\cdots$$
## 14.9.2    隧道效应
将入射波、反射波和透射波的波幅分别取为 $1$，$R$ 和 $T$，则粒子经势垒散射后的反射系数和透射系数分别为 $|R|^2$ 和 $|T|^2$。穿透概率 $P = |T| ^2$。若 $E$ 较小，以致 $k' a \gg 1$，则 $$P=P_0 \mathrm{e}^{-\frac{2a}{\hbar}\sqrt[]{2m(V_0-E)}} \text{，}$$其中 $P_0 = 16 \frac{E}{V_0}\left ( \frac{V_0 -E}{V_0}\right )$。

粒子能穿透比其能量 $E$ 更高的势垒的现象，称为**隧道效应**（tunnel effect）。
## 14.9.3    一维线性谐振子    宇称
一维**线性谐振子**（linear harmonic oscillator）的能量为 $$E_n=\left (n+\frac{1}{2}\right )\hbar \omega \text{，}\quad n = 0\text{，}1\text{，}2\text{，}\cdots$$
# 14.10    原子中的电子    原子的壳层结构
## 14.10.1    氢原子中电子的波函数及其概率分布
1. 能量量子化和主量子数$$E_n=\frac{-m_e e^4}{32\pi^2\varepsilon_0^2\hbar^2}\cdot\frac{1}{n^2}\text{，}\quad n=1\text{，}2\text{，}3\text{，}\cdots$$其中 $n$ 称为**主量子数**（principal quantum number）。

2. 角动量量子化和角量子数$$L=\sqrt{l(l+1)}\hbar\text{，}\quad l=0\text{，}1\text{，}2\text{，}\cdots\text{，}(n-1)\text{，}$$其中 $l$ 称为**轨道角动量量子数**，简称**角量子数**，或**轨道量子数**（orbital quantum number）。

3. 角动量的空间量子化和磁量子数$$L_z=m_l\hbar\text{，}\quad m_l=0\text{，}\pm 1\text{，}\pm 2\text{，}\cdots\text{，}\pm l\text{，}$$其中 $m_l$ 称为**轨道角动量磁量子数**，简称**磁量子数**（magnetic quantum number）。
## 14.10.2    电子的自旋    施特恩—格拉赫实验
每个电子具有自旋角动量 $S$ ，它在空间的任何方向的投影只可能有两种取值。设电子自旋角动量 $S$ 为$$S=\sqrt{s(s+1)}\hbar=\sqrt{\frac{3}{4}}\hbar\text{，}$$其中，$s=\frac{1}{2}$ 称为**自旋量子数**（spin quantum number）。而自旋角动量 $S$ 在外磁场方向（设为 $z$ 方向）上的分量 $S_z$ 为$$S_z=m_s\hbar\text{，}$$其中，$m_s=\pm\frac{1}{2}$ 称为**自旋磁量子数**（spin magnetic quantum number）。
## 14.10.3    泡利原理    多电子原子的壳层结构
**泡利不相容原理**（Pauli exclusion principle）：在同一个原子中，不可能有两个或两个以上的电子处于完全相同的量子态。亦即不可能具有完全相同的四个量子数（$n$，$l$，$m_l$，$m_s$）。

在原子中具有相同主量子数 $n$ 的电子数目（或电子的状态数）最多为$$z_n=\sum_{l=0}^{n-1}2(2l+1)=2n^2\text{。}$$
壳层（shell）：$n=1\text{，}2\text{，}3\text{，}4\text{，}\cdots$，用 $\text{K，L，M，N，}\cdots$ 表示。
支壳层（subshell）：$l=0\text{，}1\text{，}2\text{，}3\text{，}\cdots\text{，}n$，用 $\text{s，p，d，f，}\cdots$ 表示。

**能量最低原理**：原子处于正常稳定状态时，**每个电子总是趋向占有最低的能级**。