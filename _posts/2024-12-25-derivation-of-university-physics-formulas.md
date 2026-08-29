---
layout: post
title: “大学物理x（2）”课程涉及的公式推导
category: 大学物理
tags: [考前复习, 大学物理]
excerpt: "大物下册期末考试推导题复习。"
---

2024 秋季学期“大学物理x（2）”课程期末考试成绩构成：

填空题 10 道，30 分；

推导与证明题 1 道，10 分；

计算题 7 道，50 分；

设计应用题 1 道，10 分。

其中热学占 20%，光学占 40%，量子物理占 40%。

# 1.    平衡状态气体的统计假设
1. 当忽略重力的影响时，**平衡态气体分子均匀地分布于容器中**，即分子数密度 $n=\frac{N}{V}=\frac{\Delta N}{\Delta V}$ 是均匀的。
2. **在平衡态时，沿各方向运动的分子数目是相等的**，$v_{ix}\gt 0$ 与 $v_{ix}\lt 0$ 的分子数各占分子总数的一半；分子速度在各个方向的分量的平方的平均值也相等，即$$\overline{v_x^2}=\overline{v_y^2}=\overline{v_z^2}，$$其中$$\overline{v_x^2}=\frac{v_{1x}^2+v_{2x}^2+\cdots +v_{Nx}^2}{N}=\frac{\sum\limits_i v_{ix}^2}{N}；$$同理$$\overline{v_y^2}=\frac{\sum\limits_i v_{iy}^2}{N}；\overline{v_y^2}=\frac{\sum\limits_i v_{iy}^2}{N}。$$由于$$v^2=v_x^2+v_y^2+v_z^2，$$所以可得$$\overline{v^2}=\overline{v_x^2}+\overline{v_y^2}+\overline{v_z^2}，$$将式（9-16）代入上式，于是有$$\overline{v_x^2}=\overline{v_y^2}=\overline{v_z^2}=\frac{1}{3}\overline{v^2}。$$
设在任意形状的容器中储有理想气体，体积为 $V$，分子总数为 $N$，每个分子的质量为 $m_0$，将分子分成若干组，认为每组内分子的速度大小和方向相同，并假设每组的分子数密度为 $n_i$，则总的分子数密度为 $$n=\sum_i n_i$$在垂直于 $x$ 轴的器壁上任意取一小块面积 $\mathrm{d}A$，考虑速度为 $\boldsymbol{v}_i(v_{ix}\text{，}v_{iy}\text{，}v_{iz})$ 的单个分子在一次碰撞中对 $\mathrm{d}A$ 面积元的作用。由于碰撞是完全弹性的，所以碰撞前后分子在 $y$ 和 $z$ 方向上的速度分量不变，在 $x$ 方向上的速度分量由 $v_{ix}$ 变为 $-v_{ix}$，于是分子在碰撞过程中动量增量为 $-m_0v_{ix}-m_0v_{ix}=-2m_0v_{ix}$，分子施于容器壁面积 $\mathrm{d}A$ 的冲量则为 $2m_0v_{ix}$。在 $\mathrm{d}t$ 时间内速度为 $\boldsymbol{v}_i$ 的分子能与 $\mathrm{d}A$ 相碰的是位于以 $\mathrm{d}A$ 为底，$v_{ix}\mathrm{d}t$ 为高，以 $\boldsymbol{v}_i$ 为轴线的斜形柱体内的那一部分，该柱体内分子数目为$$n_i v_{ix}\mathrm{d}A\mathrm{d}t\text{，}$$因此，速度为 $\boldsymbol{v}_i$ 的这一组分子在 $\mathrm{d}t$ 时间内施于 $\mathrm{d}A$ 的总冲量是$$n_i v_{ix}\mathrm{d}A\mathrm{d}t(2m_0v_{ix})\text{。}$$
最后，计算所有分子在 $\mathrm{d}t$ 时间内施于 $\mathrm{d}A$ 的总冲量。考虑到 $v_{ix}\lt 0$ 的分子是不会与 $\mathrm{d}A$ 相碰撞的，因此$$\mathrm{d}I=\sum_{i(v_{ix}\gt 0)}2n_im_0v_{ix}^2\mathrm{d}A\mathrm{d}t\text{。}$$
根据平衡态气体的统计假设（2），即 $v_{ix}\gt 0$ 与 $v_{ix}\lt 0$ 的分子数各占总分子数的一半，于是$$\mathrm{d}I=\sum_{i}n_i m_{0i}v_{ix}^2\mathrm{d}A\mathrm{d}t\text{。}$$
这个冲量体现出大量气体分子在 $\mathrm{d}t$ 时间内对 $\mathrm{d}A$ 的持续作用，$\mathrm{d}I$ 与 $\mathrm{d}t$ 之比即为气体施于器壁的压力，即$$\mathrm{d}F=\frac{\mathrm{d}I}{\mathrm{d}t}\text{。}$$
因此，气体对器壁的压强为$$p=\frac{\mathrm{d}F}{\mathrm{d}A}=\frac{\mathrm{d}I}{\mathrm{d}t\cdot \mathrm{d}A}=\sum_{i}n_i m_{0}v_{ix}^2=m_0\sum_{i}n_i v_{ix}^2\text{，}$$由于 $\overline{v_x^2}=\frac{\sum\limits_i n_i v_{ix}^2}{\sum\limits_i n_i}=\frac{1}{3}\overline{v^2}$，又 $\sum\limits_i n_i =n$，则$$\sum\limits_i n_i v_{ix}^2=n\cdot \frac{1}{3}\overline{v^2}\text{，}$$得$$p=\frac{2}{3}n\left (\frac{1}{2}m_0 \overline{v^2}\right )=\frac{2}{3}n\overline{\varepsilon}_{\mathrm{kt}}\text{。}$$
>其中$$\overline{\varepsilon}_{\mathrm{kt}} = \frac{1}{2}m_0 \overline{v^2}$$称为**气体分子的平均平动动能**。

# 2.    气体分子的平均自由程和平均碰撞频率
![](/assets/images/university-physics/IMG_20241225_202907.jpg)
平均自由程为$$\overline{\lambda}=\frac{\overline{v}\Delta t}{\overline{z}\Delta t}=\frac{\overline{v}}{\overline{z}}\text{。}\tag{9-31}$$
分子的碰撞截面（collision cross-section）为 $\sigma=\pi d^2$。在 $\Delta t$ 时间内，分子所走过的路程为 $\overline{u}\Delta t$，相应的圆柱体体积为 $\sigma \overline{u}\Delta t$，那么圆柱体内的总分子数就是分子与其他分子的碰撞次数，即为 $n\sigma \overline{u}\Delta t$，因此，平均碰撞频率为$$\overline{z}=\frac{n\sigma \overline{u}\Delta t}{\Delta t}=\sigma \overline{u}n\text{，}\tag{9-32}$$式中，$n$ 为分子数密度。

统计物理中可以证明，气体分子的平均相对速率 $\overline{u}$ 与平均速率 $\overline{v}$ 之间的关系为$$\overline{u}=\sqrt{2}\overline{v}\text{。}\tag{9-33}$$代入式（9-32）即得$$\overline{z}=\sqrt{2}\sigma\overline{v}n=\sqrt{2}\pi d^2 \overline{v}n\text{，}\tag{9-34}$$代入式（9-31）就可以得到平均自由程 $\overline{\lambda}$ 为$$\overline{\lambda}=\frac{1}{\sqrt{2}\sigma n}=\frac{1}{\sqrt{2}\pi d^2 n}\text{。}\tag{9-35}$$
对于理想气体，$p=nkT$，式（9-35）可以写作$$\overline{\lambda}=\frac{kT}{\sqrt{2}\pi d^2 p}\text{。}$$

# 3.    理想气体的绝热过程
在理想气体的绝热过程中，系统对外界所做的功$$W=-(E_2-E_1)=-\frac{M}{M_{\mathrm{mol}}}C_{V,\mathrm{m}}(T_2-T_1)\text{。}\tag{10-19}$$
将上式用于一个准静态微过程，有$$p\mathrm{d}V=-\frac{M}{M_{\mathrm{mol}}}C_{V,\mathrm{m}}\mathrm{d}T\text{，}\tag{10-20}$$而理想气体满足物态方程 $pV=\frac{M}{M_{\mathrm{mol}}}RT$，对它两边微分，可得到$$p\mathrm{d}V+V\mathrm{d}p=-\frac{M}{M_{\mathrm{mol}}}R\mathrm{d}T\text{，}\tag{10-21}$$由式（10-20）和式（10-21）消去 $\mathrm{d}T$，得到$$(C_{V,\mathrm{m}}+R)p\mathrm{d}V=-C_{V,\mathrm{m}}V\mathrm{d}p\text{。}$$利用 $C_{V,\mathrm{mol}}+R=C_{p,\mathrm{mol}}$ 和 $\gamma = \frac{C_{p,\mathrm{mol}}}{C_{V,\mathrm{mol}}}$，则上式可写作$$\frac{\mathrm{d}p}{p}+\gamma \frac{\mathrm{d}V}{V}=0\text{。}$$将 $\gamma$ 看作常量，对上式积分，即得$$pV^{\gamma}=C_1\text{。}\tag{10-22a}$$
> 利用理想气体物态方程，还可以将式（10-22a）写成以下两种形式：$$TV^{\gamma -1}=C_2\text{，}\tag{10-22b}$$ $$\frac{p^{\gamma -1}}{T^{\gamma}}=C_3\text{。}\tag{10-22c}$$

# 4.    卡诺循环
![](/assets/images/university-physics/IMG_20241225_202925.jpg)
状态 1 到状态 2 的过程是等温膨胀过程，工作物质从高温热源（$T_1$）吸收热量 $Q_1$，$$Q_1=\frac{M}{M_{\mathrm{mol}}}RT_1\ln\frac{V_2}{V_1}\text{。}$$
状态 2 到状态 3 是绝热膨胀过程，该过程工作物质与高温热源分开，没有热量交换，但对外界做功，温度降到 $T_2$，体积变为 $V_3$。

状态 3 到状态 4 是等温压缩过程，工作物质向低温热源（$T_2$）放热的绝对值为 $Q_2$，$$Q_2=\frac{M}{M_{\mathrm{mol}}}RT_2\ln\frac{V_3}{V_4}\text{。}$$
状态 4 到状态 1 是绝热压缩过程，该过程工作物质与低温热源分开，没有热量交换，外界对工作物质做功，使工作物质回到状态 1，完成了一次循环。

在整个循环过程中气体内能不变，工作物质对外做的净功为$$W=Q_1-Q_2\text{。}$$
根据效率的定义，理想气体准静态过程卡诺循环的效率为$$\eta=\frac{W}{Q_1}=1-\frac{Q_2}{Q_1}=1-\frac{T_2\ln\frac{V_3}{V_4}}{T_1\ln\frac{V_2}{V_1}}\text{，}$$对绝热过程 2 $\to$ 3，有$$T_1V_2^{\gamma -1}=T_2V_3^{\gamma -1}\text{，}$$对绝热过程 4 $\to$ 1，有$$T_1V_1^{\gamma -1}=T_2V_4^{\gamma -1}\text{。}$$
两式相比，便得$$\frac{V_2}{V_1}=\frac{V_3}{V_4}\text{，}$$代入效率公式，可得$$\eta=1-\frac{T_2}{T_1}\text{。}$$

# 5.    热力学第二定律两种表述的等效性
![](/assets/images/university-physics/IMG_20241225_202943.jpg)
可以用反证法来证明热力学第二定律的两种表述是等效的。

首先我们证明，如果开尔文表述不成立，则克劳修斯表述也不成立。

如果开尔文表述不成立，即存在一个单一热源的热机 $\text{A}$ 从热源 $T_1$ 吸收热量 $Q$，完全变成有用功 $W=Q$，而未产生其他影响。现利用功 $W$ 去驱动一台制冷机 $\text{B}$，从低温热源 $T_2$ 吸收热量 $Q_2$，向高温热源 $T_1$ 放出热量 $Q_2+W=Q_2+Q$。当我们把 $\text{A}$，$\text{B}$ 一起看作一部联合制冷机时，其净效果是：热量 $Q_2$ 从低温热源 $T_2$ 传到高温热源 $T_1$ 而没有其他变化，这违反了热力学第二定律的克劳修斯表述。

我们还可以证明，如果克劳修斯表述不成立，则开尔文表述也不成立。

如果克劳修斯表述不成立，即存在一部制冷机 $\text{A}'$，外界不需要对它做功，热量 $Q$ 便可以从低温热源 $T_2$ 传到高温热源 $T_1$ 去，现在可以设想另有一部热机 $\text{B}'$，它从高温热源吸收热量 $Q_1=Q$，向低温热源放出热量 $Q_2$，对外做功 $W=Q_1-Q_2$，当把 $\text{A}'$ 和 $\text{B}'$ 一起看作一部联合热机时，其净效果是：高温热源 $T_1$ 没有发生任何变化，而只从单一的低温热源 $T_2$ 吸收了热量 $Q_1-Q_2$，全部用于对外做功 $W=Q_1-Q_2$，这违反了热力学第二定律的开尔文表述。

# 6.    薄膜的等倾干涉
![](/assets/images/university-physics/IMG_20241225_202959.jpg)
反射光 $AD$ 与折射光 $(AC+CB)$ 之间的光程差（设 $n_2\gt n_1$）为$$\delta =n_2(AC+CB)-n_1AD+\frac{\lambda}{2}\text{。}\tag{13-49}$$式中加了 $\frac{\lambda}{2}$ 这一项，是由于光束在介质的上表面反射时有半波损失的缘故。

利用折射定律 $n_1\sin i=n_2\sin i'$ 和几何关系$$\overline{AC}=\overline{CB}=\frac{e}{\cos i'}\text{，}$$ $$\overline{AD}=\overline{AB}\sin i=2e\tan i'\sin i\text{，}$$代入式（13-49）可得$$\begin{align}\delta &=\frac{2n_2e}{\cos i'}-2en_1\tan i'\sin i +\frac{\lambda}{2}\\&=\frac{2n_2e}{\cos i'}(1-\sin ^2 i')+\frac{\lambda}{2}\\&=2n_2e\cos i'+\frac{\lambda}{2}\\&=2e\sqrt{n_2^2-n_1^2\sin ^2 i}+\frac{\lambda}{2}\text{。}\end{align}$$
于是，得到反射光干涉明条纹的条件为$$\delta=2e\sqrt{n_2^2-n_1^2\sin ^2 i}+\frac{\lambda}{2}=k\lambda\text{，}\quad k=1\text{，}2\text{，}\cdots \text{明条纹}\text{。}$$
反射光干涉暗条纹的条件为$$\delta=2e\sqrt{n_2^2-n_1^2\sin ^2 i}+\frac{\lambda}{2}=(2k+1)\frac{\lambda}{2}\text{，}\quad k=0\text{，}1\text{，}2\text{，}\cdots \text{暗条纹}\text{。}$$

# 7.    一维无限深方势阱
考虑一维空间运动的粒子，它的势能函数在一定区域内为零，在区域之外为无限大，势能分布如下：$$V(x)=\begin{cases}0\text{，}\quad &0\lt x\lt a\text{，}\\ \infty\text{，}&x\lt 0\text{，}x\gt a\text{。}\end{cases}$$这是一种理想的模型，称为一维无限深方势阱（one-dimensional infinite potential well）。由于 $V(x)$ 不显含时间 $t$，所以属于定态问题，可运用定态薛定谔方程来求解：$$-\frac{\hbar ^2}{2m}\frac{\mathrm{d}^2}{\mathrm{d}x^2}\psi+V\psi=E\psi\text{。}\tag{14-54}$$
(1) $x\lt 0$ 或 $x\gt a$。在此区域内，势能趋于无穷大，则$$\frac{\hbar ^2}{2m}\frac{\mathrm{d}^2}{\mathrm{d}x^2}\psi=(V-E)\psi\text{，}$$令$$\lambda=(V-E)\frac{2m}{\hbar ^2}\text{，}$$可得方程的通解为$$\psi=A\mathrm{e}^{\lambda x}+B\mathrm{e}^{-\lambda x}\text{。}$$式中，$A$，$B$ 为两个任意常数。$V$ 趋于无穷大，则 $\lambda$ 也趋于无穷大。要保持波函数为有限的性质，$A$，$B$ 的取值必然要受到限制；在 $x\gt a$ 的区域，$\mathrm{e}^{\lambda x}\to \infty$，$\mathrm{e}^{-\lambda x}\to 0$，故 $A=0$，则此区域内的波函数 $\psi=0$；类似可以得到，在 $x\lt 0$ 区域内，波函数也为零。

(2) $0\lt x\lt a$。在此区域内，势能为零。此时式（14-54）为$$-\frac{\hbar ^2}{2m}\frac{\mathrm{d}^2}{\mathrm{d}x^2}\psi=E\psi\text{，}$$令$$k^2=\frac{2mE}{\hbar ^2}\text{，}$$则可得微分方程的通解为$$\psi=C\sin kx+D\cos kx\text{。}$$
根据波函数的连续性要求，在 $x=0\text{，}a$ 处，波函数的值为$$\psi(a)=\psi(0)=0\text{，}$$
故可以得到$$D=0\text{，}$$ $$\sin ka=0\text{，}$$所以，$k$ 的取值受到了限制，即$$k=\frac{n\pi}{a}\text{，}\quad n=1\text{，}2\text{，}3\text{，}\cdots$$
这里的 $n$ 取正整数，因此，可以得到能量的可能取值为$$E_n=\frac{n^2 h^2}{8ma^2}\text{。}$$称为能量的本征值。

与各能级相对应的波函数为$$\psi_n=C_n\sin \frac{n\pi x}{a}\text{，}$$式中，$C_n$ 可由归一化得到$$C_n=\sqrt[]{\frac{2}{a}}\text{，}$$则归一化波函数为$$\psi _n=\sqrt[]{\frac{2}{a}}\sin\frac{n\pi x}{a}\text{。}$$