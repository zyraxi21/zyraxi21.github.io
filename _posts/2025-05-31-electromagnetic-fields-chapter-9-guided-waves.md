---
layout: post
title: 第 9 章    导行电磁波
category: 电磁场与电磁波
tags: [考前复习, 电磁场与电磁波]
excerpt: "电磁场与电磁波导行电磁波章节公式整理。"
---

# 9.1    导行波的一般性质

## 9.1.1    导行波的波动方程
假设：
(1) 导波结构沿 $+z$ 轴方向是均匀的（均匀导波系统：沿电磁波传播方向为无限长的直波导，其横截面的形状、尺寸及所用的金属和介质都不变的导波系统）；
(2) 导波结构由理想导体构成，即 $\sigma \to +\infty$；
(3) 导波结构的内部为理想介质，即 $\sigma=0$ 且各向同性；
(4) 导波结构内部区域是无源的，即 $\rho=0$，$J=0$；
(5) 所研究的电磁场为时谐场，即场值随时间做简谐变化。

$k_{\mathrm{g}}$ 为导行波的波数，$k_{\mathrm{c}}$ 称为临界波数。
$$\nabla_{t}^{2}E_{x}+(k^{2}-k_{\mathrm{g}}^{2})E_{x}=0$$ $$k_{\mathrm{c}}^{2}=k^{2}-k_{\mathrm{g}}^{2}$$
传播模式：
(1) 横电磁波（TEM 波）：电场和磁场均位于垂直于传播方向的平面内。$E_{z}=0$，$H_{z}=0$。
(2) 横电波（TE 波）：$E_{z}=0$，$H_{z}\neq 0$。
(3) 横磁波（TM 波）：$E_{z}\neq 0$，$H_{z}=0$。

## 9.1.2    TEM 波的一般性质

### 1. 解的形式
解的形式：$$E_{x}=- \frac{\mathrm{j}}{k^{2}-k_{\mathrm{g}}^{2}}\left( k_{\mathrm{g}} \frac{\partial E_{z}}{\partial x}+ \omega \mu  \frac{\partial H_{z}}{\partial y}\right)$$ $$E_{y}=- \frac{\mathrm{j}}{k^{2}-k_{\mathrm{g}}^{2}}\left( k_{\mathrm{g}} \frac{\partial E_{z}}{\partial y}- \omega \mu  \frac{\partial H_{z}}{\partial x}\right)$$ $$H_{x}=- \frac{\mathrm{j}}{k^{2}-k_{\mathrm{g}}^{2}}\left( k_{\mathrm{g}} \frac{\partial H_{z}}{\partial x}- \omega \varepsilon  \frac{\partial E_{z}}{\partial y}\right)$$ $$H_{y}=- \frac{\mathrm{j}}{k^{2}-k_{\mathrm{g}}^{2}}\left( k_{\mathrm{g}} \frac{\partial H_{z}}{\partial y}+ \omega \varepsilon  \frac{\partial E_{z}}{\partial x}\right)$$

故只有当$$\boxed{k_{\mathrm{g}}=k=\omega \sqrt{ \mu\varepsilon }}$$时，导波系统中才存在 TEM 波。

### 3. 与均匀平面波的对比
TEM 波的相速度为$$v_{\mathrm{pg}}= \frac{\omega}{k}=\frac{1}{\sqrt{ \mu\varepsilon }}$$
合成波阻抗：相对于观察方向成右手关系的一对电场与磁场正交分量的比值。$$Z_{\mathrm{TEM}}= \frac{E_{x}}{H_{y}} =\eta$$
即传输特性与无界空间相同（但非均匀平面波）。

## 9.1.3    TE，TM 波的一般性质

### 1. 解的形式
对于 TE 波：$$E_{x}=\frac{\mathrm{j}}{k_{\mathrm{c}}^{2}}\left( -\omega \mu  \frac{\partial H_{z}}{\partial y} \right)$$ $$E_{y}=\frac{\mathrm{j}}{k_{\mathrm{c}}^{2}}\left(\omega \mu  \frac{\partial H_{z}}{\partial x} \right)$$ $$H_{x}=\frac{\mathrm{j}}{k_{\mathrm{c}}^{2}}\left( -k_{\mathrm{g}}  \frac{\partial H_{z}}{\partial x} \right)$$ $$H_{y}=\frac{\mathrm{j}}{k_{\mathrm{c}}^{2}}\left( -k_{\mathrm{g}}  \frac{\partial H_{z}}{\partial y} \right)$$
对于 TM 波：$$E_{x}=\frac{\mathrm{j}}{k_{\mathrm{c}}^{2}}\left( -k_{\mathrm{g}}  \frac{\partial E_{z}}{\partial x} \right)$$ $$E_{y}=\frac{\mathrm{j}}{k_{\mathrm{c}}^{2}}\left(-k_{\mathrm{g}} \frac{\partial E_{z}}{\partial y} \right)$$ $$H_{x}=\frac{\mathrm{j}}{k_{\mathrm{c}}^{2}}\left(\omega \varepsilon \frac{\partial E_{z}}{\partial y} \right)$$ $$H_{y}=\frac{\mathrm{j}}{k_{\mathrm{c}}^{2}}\left(-\omega \varepsilon \frac{\partial E_{z}}{\partial x} \right)$$

### 2. TE 波和 TM 波的传播特性
当 $k>k_{\mathrm{c}}$ 时，$k_{\mathrm{g}}$ 为实数，电磁波能够在波导中传播，$\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z}$ 为相位因子（传播因子）。
当 $k<k_{\mathrm{c}}$ 时，$k_{\mathrm{g}}$ 为纯虚数，$\pm \mathrm{j}k_{\mathrm{g}}$ 为实数，这说明 $\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z}$ 为衰减因子。
当 $k=k_{\mathrm{c}}$ 时，$k_{\mathrm{g}}=0$，则无相位变化，即**无传播过程**。

$k_{\mathrm{c}}$ 称为临界波数或截止波数，相应地有临界波长 $\lambda_{\mathrm{c}}$ $$\lambda_{\mathrm{c}}= \frac{2\pi}{k_{\mathrm{c}}}$$
TE 波、TM 波的传输条件：$k>k_{\mathrm{c}}$ 或 $f>f_{\mathrm{c}}$ 或 $\lambda<\lambda_{\mathrm{c}}$。

波型因子：$\sqrt{ 1-\left( \frac{\lambda}{\lambda_{\mathrm{c}}} \right)^{2} }$。

波导波长$$\lambda_{\mathrm{g}}=\frac{\lambda}{\sqrt{ 1-\left( \frac{\lambda}{\lambda_{\mathrm{c}}} \right)^{2} }}$$
导行波的相速度 $v_{\mathrm{pg}}$ 为$$v_{\mathrm{pg}}=\lambda_{\mathrm{g}}f= \frac{v_{\mathrm{p}}}{\sqrt{ 1-\left( \frac{\lambda}{\lambda_{\mathrm{c}}} \right)^{2} }}>v_{\mathrm{p}}$$
TE 波的波阻抗为$$Z_{\mathrm{TE}}=\frac{\eta}{\sqrt{ 1-\left( \frac{\lambda}{\lambda_{\mathrm{c}}} \right)^{2} }}$$
TM 波的波阻抗为$$Z_{\mathrm{TM}}=\eta\sqrt{ 1-\left( \frac{\lambda}{\lambda_{\mathrm{c}}} \right)^{2} }$$

# 9.2    矩形波导中的导行波
矩形波导：波导的横截面为矩形，宽边尺寸为 $a$，窄边尺寸为 $b$，材料为良导体（铜或铝），内为空气或填充介质。

## 9.2.1    矩形波导中 TM 波的解
设电磁波的传播方向为 $+z$ 方向。设 $e_{z}$ 满足 $E_{z}=e_{z}(x,y)\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z}$ 且 $e_{z}(x,y)=X(x)Y(y)$，再设 $\frac{1}{X(x)} \frac{\mathrm{d}^{2}X(x)}{\mathrm{d}x^{2}}=-k_{x}^{2}$，$\frac{1}{Y(y)} \frac{\mathrm{d}^{2}Y(y)}{\mathrm{d}x^{2}}=-k_{y}^{2}$，则$$k_{x}^{2}+k_{y}^{2}=k_{\mathrm{c}}^{2}$$解得$$e_{z}(x,y)=(A\sin k_{x}x+B\cos k_{x}x)(C\sin k_{y}y+D\cos k_{y}y)$$其中 $k_{x}$、$k_{y}$ 称为分离常数，与波导类型及尺寸有关。$A$、$B$、$C$、$D$ 称为积分常数，与边界条件及激励源（初始条件）有关。

由边界条件，当 $x=a$ 时，$E_{z}=0$，$k_{x}$ 必须满足$$\boxed{k_{x}= \frac{m\pi}{a}\quad (m=1,2,3,\cdots)}$$其中 $m$ 不能取零。
当 $y=b$ 时，$E_{z}=0$，$k_y$ 必须满足$$\boxed{k_{y}=\frac{n\pi}{b}\quad (n=1,2,3,\cdots)}$$其中 $n$ 不能取零。

故最终解得$$E_{z}(x,y)=E_{0}\sin \frac{m\pi}{a}x\sin \frac{n\pi}{b}y\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z} \quad (m\neq 0,n\neq 0)$$
> $$E_{x}=- \frac{\mathrm{j}k_{\mathrm{g}}}{k_{\mathrm{c}}^{2}} \frac{m\pi}{a}E_{0}\cos\left( \frac{m\pi}{a}x \right)\sin\left( \frac{n\pi}{b}y \right)\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z}$$ $$E_{y}=- \frac{\mathrm{j}k_{\mathrm{g}}}{k_{\mathrm{c}}^{2}} \frac{n\pi}{b}E_{0}\sin\left( \frac{m\pi}{a}x \right)\cos\left( \frac{n\pi}{b}y \right)\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z}$$ $$H_{x}=\mathrm{j} \frac{\omega\varepsilon}{k_{\mathrm{c}}^{2}} \frac{n\pi}{b}E_{0}\sin\left( \frac{m\pi}{a}x \right)\cos\left( \frac{n\pi}{b}y \right)\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z}$$ $$H_{y}=-\mathrm{j} \frac{\omega\varepsilon}{k_{\mathrm{c}}^{2}} \frac{m\pi}{a}E_{0}\cos\left( \frac{m\pi}{a}x \right)\sin\left( \frac{n\pi}{b}y \right)\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z}$$

$E_{0}=AC$ 由电磁波的激励源（初始条件）确定，讨论波导时认为已知。

## 9.2.2    矩形波导中 TE 波的解
设电磁波的传播方向为 $+z$ 方向。
$$h_{z}(x,y)=(A\sin k_{x}x+B\cos k_{x}x)(C\sin k_{y}y+D\cos k_{y}y)$$
应用边界条件来确定 $k_{x}$、$k_{y}$ 及 $A$、$B$、$C$、$D$：
$x=0$ 和 $x=a$ 处：$E_{y}=0$，故 $\frac{\partial H_{z}}{\partial x}=0$。
$y=0$ 和 $y=a$ 处：$E_{x}=0$，故 $\frac{\partial H_{z}}{\partial y}=0$。

解得$$H_{z}(x,y)=H_{0}\cos \frac{m\pi}{a}x\cos \frac{n\pi}{b}y\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z}$$其中 $H_{0}=BD$。

> $$E_{x}=\mathrm{j} \frac{\omega\mu}{k_{\mathrm{c}}^{2}} \frac{n\pi}{b}H_{0}\cos\left( \frac{m\pi}{a}x \right)\sin\left( \frac{n\pi}{b}y \right)\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z}$$ $$E_{y}=-\mathrm{j} \frac{\omega\mu}{k_{\mathrm{c}}^{2}} \frac{m\pi}{a}H_{0}\sin\left( \frac{m\pi}{a}x \right)\cos\left( \frac{n\pi}{b}y \right)\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z}$$ $$H_{x}= \frac{\mathrm{j}k_{\mathrm{g}}}{k_{\mathrm{c}}^{2}} \frac{m\pi}{a}H_{0}\sin\left( \frac{m\pi}{a}x \right)\cos\left( \frac{n\pi}{b}y \right)\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z}$$ $$H_{y}=\frac{\mathrm{j}k_{\mathrm{g}}}{k_{\mathrm{c}}^{2}}  \frac{n\pi}{b}H_{0}\cos\left( \frac{m\pi}{a}x \right)\sin\left( \frac{n\pi}{b}y \right)\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z}$$

## 9.2.3    矩形波导中 TE，TM 波的传播特性
截止波数：$$\boxed{k_{\mathrm{c}}=\sqrt{ \left( \frac{m\pi}{a} \right)^{2}+\left( \frac{n\pi}{b} \right)^{2} }}$$
截止波长：$$\boxed{\lambda_{\mathrm{c}}=\frac{2\pi}{k_{\mathrm{c}}}=\frac{2}{\sqrt{ \left( \frac{m}{a} \right)^{2}+\left( \frac{n}{b} \right)^{2} }}}$$
截止频率：$$\boxed{f_{\mathrm{c}}=\frac{k_{\mathrm{c}}}{2\pi \sqrt{ \mu\varepsilon }}=\frac{\sqrt{ \left( \frac{m}{a} \right)^{2}+\left( \frac{n}{b} \right)^{2} }}{2\sqrt{ \mu\varepsilon }}}$$
传播特性：
非均匀平面波：
- 场量沿纵向只有相移变化而无振幅变化——无衰减的行波。
- 场量沿横向只有幅度成正弦或余弦变化而无相移——驻波。

每一组确定的 $m$，$n$ 对应一种确定的场分布，称为波型或模式。记作 $\mathrm{TE}_{mn}$ 模或 $\mathrm{TM}_{mn}$ 模。
- 对于 TE 波，$m$ 和 $n$ 可以取 0，但不能同时为 0。
- 对于 TM 波，$m$ 和 $n$ 都不能取 0。

> TE 模与 TM 模有无限多种。不同的模式对应不同的截止波长，只有小于 $\lambda_{\mathrm{c}}$ 的模式才能传播。

![图](/assets/images/electromagnetic-fields-and-waves/1748264330824.png)
在模式分布图中，称截止波长最长（截止频率最低）的模式为主模（最低波型）。一般横截面尺寸 $a>b$，故 $\mathrm{TE}_{10}$ 模为矩形波导的主模式。

模式分布图中，Ⅰ区为截止区，Ⅱ区为单模区，Ⅲ区为多模区。

单模传播条件：$$\begin{cases}a<\lambda<2a\\\lambda>2b\end{cases}$$
将不同模式具有相同截止波长的情况称为模式简并，把截止波长相同的不同模式称为简并模式。

场分布图：
![图](/assets/images/electromagnetic-fields-and-waves/Screenshot_2025-05-26-21-13-22-902_com.miui.galle.png)
![图](/assets/images/electromagnetic-fields-and-waves/1748265528077.jpg)

电力线：实线，可以闭合，也可以不闭合。发于导体表面正电荷，止于负电荷。
磁力线：虚线，闭合。

电场法判断：
1. 判断 TE 波或 TM 波：电场线是否有纵向分量（纵向是否有实线）。
    - TE 波：纵向无实线。
    - TM 波：纵向有实线。
2. 电场的最大值：电场线密集处。
3. 判断 $m$、$n$：
    - $m$：垂直于长边的密集处个数。
    - $n$：垂直于短边的密集处个数。

磁场法判断：
1. 判断 TE 波或 TM 波：
    - TE 波：闭合磁场线不在横截面上。
    - TM 波：闭合磁场线在横截面上。
2. 判断 $m$、$n$：
    - $\mathrm{TM}_{mn}$：数横截面上长边和短边上闭合磁场线的个数。
    - $\mathrm{TE}_{mn}$：数上（下）底面和侧面上闭合磁场线的个数。

# 9.3    矩形波导中的 $\mathrm{TE}_{10}$ 波

## 9.3.1    $\mathrm{TE}_{10}$ 波的场分量表达式及其传播特性
> $\mathrm{TE}_{10}$ 波的场分量表达式：$$E_{x}=H_{y}=E_{z}=0$$ $$E_{y}=- \frac{\mathrm{j}\omega \mu}{k_{\mathrm{c}}^{2}} \frac{\pi}{a}H_{0}\sin \left (\frac{\pi}{a}x \right )\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z}$$ $$H_{x}= \frac{\mathrm{j}k_{\mathrm{g}}}{k_{\mathrm{c}}^{2}} \frac{\pi}{a}H_{0}\sin \left (\frac{\pi}{a}x \right )\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z}$$ $$H_{z}=H_{0}\cos \left (\frac{\pi}{a}x \right )\mathrm{e}^{-\mathrm{j}k_{\mathrm{g}}z}$$

截止波数$$k_{\mathrm{c}}=\frac{\pi}{a}$$
截止波长$$\lambda_{\mathrm{c}}=2a$$
波导波长$$\lambda_{\mathrm{g}}=\frac{\lambda}{\sqrt{ 1-\left( \frac{\lambda}{2a} \right)^{2} }}$$
波导中的相速度$$v_{\mathrm{pg}}=\frac{v_{\mathrm{p}}}{\sqrt{ 1-\left( \frac{\lambda}{2a} \right)^{2} }}$$
波阻抗$$Z_{\mathrm{TE}_{10}}=\frac{\eta}{\sqrt{ 1-\left( \frac{\lambda}{2a} \right)^{2} }}$$
场分量与 $b$ 无关。
- 当传输很大功率时，加宽 $b$ 边可增大功率容量。
- 当传输小功率时，减小 $b$ 边可减轻波导的质量。

## 9.3.2    波导壁上的电荷、电流分布
由边界条件知只有上、下壁（长边）有电荷积累。

1. 上、下两壁电荷分布沿 $x$ 方向是呈正弦变化，上、下壁电荷反号，电场最强的地方对应表面电荷分布最密集的地方。

2. 位移电流最强处与电场最强处相差 $\frac{\lambda_{\mathrm{g}}}{4}$ 距离；波导中的位移电流与波导壁上的表面电流相衔接。

3. 上、下壁的轴向电流沿 $x$ 方向呈正弦变化，横向电流沿 $x$ 方向呈余弦变化，且上、下两壁的电流反向。

4. 在波导宽壁中央的面电流只有 $z$ 方向分量，如果在波导宽壁中央沿 $z$ 方向开一个纵向窄缝，不会切断表面电流的通路，因此电磁能量不会从该窄缝辐射出来，波导内的电磁场分布也不会改变。

5. 两侧壁只存在沿 $y$ 方向的横向电流，且方向相同，沿轴向开一槽缝将会切断横向电流造成辐射，这一性质被广泛应用于槽缝天线。

![图](/assets/images/electromagnetic-fields-and-waves/1748267319273.jpg)
